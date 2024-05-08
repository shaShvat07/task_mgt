const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const { verifyToken } = require('../middleware/verifyToken');

// CRUD operations for lists
router.post('/:userId/lists', verifyToken, listController.createList);
router.get('/:userId/lists', verifyToken, listController.getAllListsByUserId);
router.get('/:userId/lists/:listId', verifyToken, listController.getListById);
router.put('/:userId/lists/:listId', verifyToken, listController.updateList);
router.delete('/:userId/lists/:listId', verifyToken, listController.deleteList);

module.exports = { listRoutes: router };