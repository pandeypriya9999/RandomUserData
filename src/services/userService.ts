import axios from 'axios';
import User from '../models/User';
import config from '../config/config';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchWithRetry = async (
  url: string,
  retries: number = 3,
  backoff: number = 1000
): Promise<any[]> => {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error: any) {
    const statusCode = error.response?.status;

    // Retry only for specific transient errors
    if ((statusCode === 429 || statusCode === 502) && retries > 0) {
      console.warn(
        `Transient error (${statusCode}) encountered. Retrying in ${backoff} ms...`
      );
      await delay(backoff); // Wait before retrying
      return fetchWithRetry(url, retries - 1, backoff * 2); // Retry with exponential backoff
    }

    // Log and fail gracefully after retries are exhausted
    console.error(
      `Failed after ${3 - retries} retries. Status: ${statusCode}, Error: ${error.message}`
    );
    return []; // Return empty array to prevent crashing the batch
  }
};

const fetchDataAndSaveUsers = async (numUsers: number): Promise<void> => {
  const { BATCH_SIZE, SLEEP_TIME } = config;

  const totalBatches = Math.ceil(numUsers / BATCH_SIZE);
  console.log(`Starting to fetch ${numUsers} users in ${totalBatches} batches.`);

  for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
    console.log(`Processing batch ${batchIndex + 1} of ${totalBatches}...`);
    let users: any[] = [];

    while (users.length < BATCH_SIZE) {
      const remainingUsers = BATCH_SIZE - users.length;
      console.log(`Attempting to fetch ${remainingUsers} more users to complete the batch...`);

      const batchRequests = Array.from({ length: Math.ceil(remainingUsers / 60) }, async () => {
        const url = `https://randomuser.me/api?results=60`;
        return fetchWithRetry(url, 3); // Retry up to 3 times
      });

      // Fetch additional users
      const batchResults = await Promise.all(batchRequests);
      users = users.concat(batchResults.flat());

      // Stop if the API consistently fails (to prevent infinite loops)
      if (batchResults.flat().length === 0) {
        console.warn(`Unable to fetch more users for batch ${batchIndex + 1}. Proceeding with ${users.length} users.`);
        break;
      }
    }

    // Save users to the database
    try {
      await User.insertMany(users);
      console.log(`Batch ${batchIndex + 1}: ${users.length} users saved.`);
    } catch (error: any) {
      console.error('Error saving users to DB:', error.message);
    }

    // Delay before next batch
    if (batchIndex + 1 < totalBatches) {
      console.log(`Sleeping for ${SLEEP_TIME / 1000} seconds before the next batch.`);
      await delay(SLEEP_TIME);
    }
  }

  console.log('All batches processed successfully!');
};


export default fetchDataAndSaveUsers;