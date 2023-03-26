import express from 'express';
import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';
import Router from '../src/routes/routes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/', Router);

// Get the MongoDB connection URI from the environment variables
//const uri = process.env.ATLAS_URI;
/*
const uri = "mongodb+srv://TaskData12:gchsd3IWY7K64vwr@cluster0.woteppr.mongodb.net/?retryWrites=true&w=majority";
// Use mongoose to create a connection to the MongoDB Atlas cluster
const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    } as mongoose.ConnectOptions);
    console.log('MongoDB running');
  } catch (err) {
    console.log(err); // add this line to log any error message
  }
};



// Call the connectToDatabase function and wait for it to resolve before starting the server
connectToDatabase().then(() => {
  app.listen(5000, () => {
    console.log('Server started on port 5000');
  });
});
*/

async function main() {
  const client = new MongoClient('mongodb+srv://TaskData12:gchsd3IWY7K64vwr@cluster0.woteppr.mongodb.net/?retryWrites=true&w=majority');
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}
main();
// Error handler middleware
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

//import Router from '../src/routes/routes.js';
