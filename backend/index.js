//index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const { authRoutes } = require('./routes/authRoutes');
const { taskRoutes } = require('./routes/taskRoutes');
const { listRoutes } = require('./routes/listRoutes');
const { userRoutes } = require('./routes/userRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/', authRoutes); 
app.use('/', userRoutes);
app.use('/', taskRoutes);
app.use('/', listRoutes);
