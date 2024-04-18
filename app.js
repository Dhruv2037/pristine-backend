const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const connectDb = require("./config/database");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorhandler.js");
const contactRoute =  require("./routes/contactRoute.js");

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors());
mongoose.Promise = global.Promise;

connectDb();
app.use(express.json());

//routes
app.use('/api',contactRoute);

app.post('/api/formdata', (req, res) => {
 // res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  const formData = req.body;
  // Handle the form data as needed
  console.log(formData);
  res.send('Received form data successfully');
});


app.use(errorHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});