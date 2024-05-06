// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});