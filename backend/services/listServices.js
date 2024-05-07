const { pool } = require('../config/dbConfig');

// Create a new list
exports.createList = async (user_id, title) => {
    const query = 'INSERT INTO lists (user_id, title) VALUES ($1, $2) RETURNING *';
    const values = [user_id, title];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Get all lists for a user
exports.getAllListsByUserId = async (user_id) => {
    const query = 'SELECT * FROM lists WHERE user_id = $1';
    const values = [user_id];
    const { rows } = await pool.query(query, values);
    return rows;
};

// Get a list by ID
exports.getListById = async (listId) => {
    const query = 'SELECT * FROM lists WHERE list_id = $1';
    const values = [listId];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Update a list
exports.updateList = async (listId, title) => {
    const query = 'UPDATE lists SET title = $1 WHERE list_id = $2 RETURNING *';
    const values = [title, listId];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Delete a list
exports.deleteList = async (listId) => {
    const query = 'DELETE FROM lists WHERE list_id = $1 RETURNING *';
    const values = [listId];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Add a task ID to the list's array of task IDs
exports.addTaskToList = async (listId, taskId) => {
    const query = 'UPDATE lists SET tasks = array_append(tasks, $1) WHERE list_id = $2';
    const values = [taskId, listId];
    await pool.query(query, values);
};