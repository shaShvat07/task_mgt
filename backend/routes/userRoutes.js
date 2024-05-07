const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');

router.get("/:userId", verifyToken, (req, res) => {
  const user_id = req.params.userId;
  if(user_id == req.data.user.user_id){
    res.json({ data: req.data.user });
  }
  else{
    return res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = { userRoutes: router };
