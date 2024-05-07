const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { verifyToken } = require('../middleware/verifyToken');

// CRUD operations for tasks
router.post('/lists/:listId/tasks', verifyToken, taskController.createTask);
router.get('/lists/:listId/tasks/:taskId', verifyToken, taskController.getTaskById);
router.put('/lists/:listId/tasks/:taskId', verifyToken, taskController.updateTask);
router.delete('/lists/:listId/tasks/:taskId', verifyToken, taskController.deleteTask);

module.exports = { taskRoutes: router };
