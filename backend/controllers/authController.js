const bcrypt = require("bcrypt");
const { pool } = require('../config/dbConfig');
const { signToken } = require('../config/jwtConfig');

//Register
async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
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

    const token = signToken({ userId: user.id });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(400).send("SERVER ERROR");
  }
}

module.exports = { register, login };
