# User Service - Fetch and Save Users

This project provides a service to fetch random user data from the [RandomUser.me API](https://randomuser.me) and save it to a MongoDB database. It handles batch processing, retries on transient errors (e.g., rate limiting and server errors), and includes pagination for querying users from the database.

## Features

- Fetch users from the RandomUser.me API.
- Save users to MongoDB in batches.
- Retry logic for transient errors (HTTP status codes 429 and 502).
- Paginated API for querying saved users from MongoDB.
- Customizable batch size, request rate, and sleep time.
- Fully tested with Jest.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **TypeScript**: Static typing for better development experience.
- **Express.js**: Web framework for API routes.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM for MongoDB in Node.js.
- **Jest**: Testing framework for unit and integration tests.
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
