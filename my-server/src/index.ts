import express from 'express';
import mongoose from 'mongoose';
import Router from './routes/routes';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const uri = process.env.ATLAS_URI as string;
const port = process.env.PORT as string;
const host = process.env.HOST as string;
const app = express();
app.use(express.json());

//  setup for Cors for axios api request
app.use(cors()); // apply cors middleware to all routes

app.use('/', Router);

// Use mongoose to create a connection to the MongoDB Atlas cluster
const connectToDatabase = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('MongoDB running');
  } catch (err) {
    console.log(err);
  }
};

// Call the connectToDatabase function and wait for it to resolve before starting the server
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port} Now`);
  });
});
