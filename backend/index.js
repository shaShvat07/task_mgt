//index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const { authRoutes } = require('./routes/authRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/auth', authRoutes); // Mount authentication routes
