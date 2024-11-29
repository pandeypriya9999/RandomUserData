# User Service - Fetch and Save Users

This project provides a service to fetch random user data from the [RandomUser.me API](https://randomuser.me) and save it to a MongoDB database. It handles batch processing, retries on transient errors (e.g., rate limiting and server errors), and includes pagination for querying users from the database.

## Features

- Fetch users from the RandomUser.me API.
- Save users to MongoDB in batches.
- Retry logic for transient errors (HTTP status codes 429 and 502).
- Paginated API for querying saved users from MongoDB.
- Customizable batch size, request rate, and sleep time.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **TypeScript**: Static typing for better development experience.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM for MongoDB in Node.js.
- **axios**: Promise-based HTTP client for making requests to external APIs.

## Setup and Installation

### Prerequisites

Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download/community) or a MongoDB cloud instance (e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).

### Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/pandeypriya9999/RandomUserData.git
cd RandomUserData
```

### Install Dependencies

Run the following command to install all necessary dependencies:
```bash
npm install
```

This will install the required Node.js packages, including dependencies like Express, Axios, Mongoose, Jest, and others.

### Environment Variables
Create a .env file in the root of the project with the following variables:

```bash
MONGO_URI
BATCH_SIZE                        
REQUESTS_PER_SECOND                        
SLEEP_TIME
```

1. MONGO_URI: The connection string for your MongoDB instance. If you're using a local instance, it will look like mongodb://localhost:27017/user_service. If you're using a cloud service like MongoDB Atlas, you will need to replace this with your connection string.
2. BATCH_SIZE: The number of users to fetch per batch from the RandomUser.me API. The default is 300.
3. REQUESTS_PER_SECOND: The maximum number of requests that should be made to the API per second to avoid hitting rate limits. The default is 5.
4. SLEEP_TIME: The amount of time (in milliseconds) the system should wait before processing the next batch of users. The default is 30000 milliseconds (30 seconds).

### Running the Project

Once you've installed the dependencies and set up the environment variables, you can run the project locally by following the steps below:

## 1. Start the Application

To start the application, run the following command:
```bash
npm run build
npm start
```

This command will start the application, and the process will begin fetching users in batches from the RandomUser.me API and saving them into the MongoDB database.

## 2. Running the Application in Development Mode

For development purposes, you can use npm run dev to start the application in watch mode (using Nodemon):

```bash
npm run dev
```

This will automatically restart the server whenever changes are made to the code.

## 3. Running Tests

To ensure the correctness of the application, run the unit tests with the following command:
```bash
npm test
```

This will run Jest and execute the test cases defined in the /tests folder, verifying the core functionality of the project, including data fetching, retry logic, and database interactions.

### Available Endpoints

- GET: http://localhost:4000/api/users
- GET: http://localhost:4000/api/users?limit=10&page=1&sort=name.asc&search={"gender": "male"}
- POST: http://localhost:4000/api/config

```bash
{
   "requestPerBatch": 300,
   "requestsPerSecond": 5,
   "batchSleep": 30,
   "apiEndpoint": "https://randomuser.me/api/",
   "apiParams": {
       "results": 1000
   }
}
```

- POST: http://localhost:4000/api/users/fetch
```bash
{
  "numUsers":1000
}
```
