const express = require("express");
// const reportRouter = require('./routes/courseRoute');
const MongoClient = require('mongodb').MongoClient; 
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { MONGO_URI, SECRET_KEY } = require("./config/keys");
const CourseModel = require("./model/CourseModel");
require('dotenv').config();

// Middleware
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/", require("./routes/courseRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/profile", require("./routes/profileRoute"));
app.use("/api/enroll-course", require("./routes/enrollRoute"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use('/api/items', require('./routes/SubCategoryRoute'));
app.use('/api/', require('./routes/frontendsRoute'));



// Deploy
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Database and server setup
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    console.log("Error occurred");
  });







  



