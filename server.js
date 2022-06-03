require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204
app.use(express.static('public'));

// Database connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s 
});

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Main page
app.get('/', (req, res) => {
  let path = process.cwd() + '/views/index.html';
  res.sendFile(path, error => {
    if (error) next(error);
    console.log("Served: index.html");
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on PORT ' + listener.address().port)
});