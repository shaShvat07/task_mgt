const bcrypt = require("bcrypt");
const { pool } = require('../config/dbConfig');
const jwt = require('jsonwebtoken');

//Register
async function register(req, res) {
  try {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, email, hashedPassword]
    );    

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("SERVER ERROR");
  }
}

//Login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ user: user }, process.env.SECRET_KEY,{
      expiresIn: "1h"
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(400).send("SERVER ERROR");
  }
}

module.exports = { register, login };
