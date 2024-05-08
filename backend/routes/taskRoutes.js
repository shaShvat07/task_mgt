const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { verifyToken } = require('../middleware/verifyToken');

// CRUD operations for tasks
router.post('/:userId/lists/:listId/tasks', verifyToken, taskController.createTask);
router.get('/:userId/lists/:listId/tasks', verifyToken, taskController.getAllTask);
router.get('/:userId/lists/:listId/tasks/:taskId', verifyToken, taskController.getTaskById);
router.put('/:userId/lists/:listId/tasks/:taskId', verifyToken, taskController.updateTask);
router.delete('/:userId/lists/:listId/tasks/:taskId', verifyToken, taskController.deleteTask);

module.exports = { taskRoutes: router };
