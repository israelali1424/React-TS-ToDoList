import express from 'express';
import mongoose from 'mongoose';
//import Router from '../src/routes/routes';
import Router from './routes/routes'
// seting up the process.env so the mongo connection string can be imported from .env
import dotenv from 'dotenv';
dotenv.config();
let app = express();
app.use(express.json());
// gets all routes for homepage etc
app.use('/', Router);

//  set up mongo sign credentials
const uri:any = process.env.ATLAS_URI;

//await mongoose.createConnection(uri).asPromise();
const connectionCreate = async () => {
    const bar = await mongoose.createConnection(uri).asPromise();
};

// connect to MongoDb
const db = mongoose.connection;
db.once('open', function () {
  console.log('MongoDB running');
}).on('error', function (err) {
  console.log(err);
});
app.listen(5000, async function () {
  console.log('Server started on port 5000');
});

// error handler
app.use(function (err:any, req:any, res:any, next:any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
