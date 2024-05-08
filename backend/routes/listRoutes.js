const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const { verifyToken } = require('../middleware/verifyToken');

// CRUD operations for lists
router.post('/lists', verifyToken, listController.createList);
router.get('/lists', verifyToken, listController.getAllListsByUserId);
router.get('/lists/:listId', verifyToken, listController.getListById);
router.put('/lists/:listId', verifyToken, listController.updateList);
router.delete('/lists/:listId', verifyToken, listController.deleteList);

module.exports = { listRoutes: router };