import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

//Note: Modify MongoDB URI
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://<db_username>:<db_password>@<cluster_name>.sknenql.mongodb.net/?retryWrites=true&w=majority&appName=<cluster_Name>';
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }

  // Listen to connection events
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
  });
};

export default connectDB;
