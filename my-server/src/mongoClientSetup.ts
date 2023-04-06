import express from 'express';
import Router from './routes/routes';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/', Router);
// This how to set up a mongo db database connection using the MongoClient
//Get the MongoDB connection URI and port from the environment variables
const MONGODB_URI = process.env.ATLAS_URI ?? '';
const PORT = process.env.PORT ?? '';

const connectToDatabase = async () => {
  try {
    if (!MONGODB_URI) throw new Error('Missing MongoDB connection string');
    const client = await MongoClient.connect(MONGODB_URI);

    console.log('MongoDB connection has been established');
    const db = client.db();
    // if the database connection fails,
    //the connectToDatabase function will log the error message and throw the error
    client.close();
  } catch (error: any) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};
// Call the connectToDatabase function and wait for it to resolve before starting the server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error.message);
  });
