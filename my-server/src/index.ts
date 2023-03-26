import express from 'express';
import mongoose from 'mongoose';
import Router from './routes/routes'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/', Router);

// Get the MongoDB connection URI from the environment variables
const uri = process.env.ATLAS_URI ?? '';

// Use mongoose to create a connection to the MongoDB Atlas cluster
// Use mongoose to create a connection to the MongoDB Atlas cluster
const connectToDatabase = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as mongoose.ConnectOptions);
    console.log('MongoDB running');
  } catch (err) {
    console.log(err);
  }
}

// Error handler middleware
app.use((err:any, req:any, res:any, next:any) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Call the connectToDatabase function and wait for it to resolve before starting the server
connectToDatabase().then(() => {
  app.listen(5000, () => {
    console.log('Server started on port 5000');
  });
});

// import Router from './routes/routes'
//const uri = process.env.ATLAS_URI ?? '';