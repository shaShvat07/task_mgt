const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { verifyToken } = require('../middleware/verifyToken');

// CRUD operations for tasks
router.post('/tasks', verifyToken, taskController.createTask);
router.get('/tasks/:taskId', verifyToken, taskController.getTaskById);
router.put('/tasks/:taskId', verifyToken, taskController.updateTask);
router.delete('/tasks/:taskId', verifyToken, taskController.deleteTask);

module.exports = { taskRoutes: router };
