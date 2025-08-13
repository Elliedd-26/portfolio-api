require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // ADD THIS - for allowing React to connect

const adminRoutes = require("./routes/adminRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

// connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// middleware
app.use(cors());
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // ADD THIS - for handling JSON requests from React

// routes
app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
