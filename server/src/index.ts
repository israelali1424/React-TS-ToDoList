import express from 'express';
import mongoose from 'mongoose';

let app = express();
app.get('/', function (req, res) {
  console.log('Server Running on Port 3000');
  res.send('<h1>Israel is the best</h1>');
});

app.get('/contact', function (req, res) {
  res.send('<h1> Contact Israel at IsraelAli@gmail.com</h1>');
});

app.get('/about', function (req, res) {
  res.send('<h1> Israel likes to take naps </h1>');
});
app.get('/find2', function (req, res) {
  res.send('<h1> Find me </h1>');
});

app.listen(5000, function () {
  console.log('Server started on port 5000');
});
