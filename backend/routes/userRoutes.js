const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const userController = require('../controllers/userController');

router.get("/:userId", verifyToken, userController.getUserById);

module.exports = { userRoutes: router };
