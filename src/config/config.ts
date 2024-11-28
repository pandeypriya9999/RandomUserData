export default {
  MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://<db_username>:<db_password>@<cluster_name>.sknenql.mongodb.net/?retryWrites=true&w=majority&appName=<cluster_Name>',
  BATCH_SIZE: 300,
  REQUESTS_PER_SECOND: 5,
  SLEEP_TIME: 30000,
  API_URL: 'https://randomuser.me/api',
};
