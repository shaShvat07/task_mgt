const jwt = require('jsonwebtoken');

function signToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
}

module.exports = { signToken };
