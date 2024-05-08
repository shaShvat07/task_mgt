const { pool } = require('../config/dbConfig');

// Get user by ID
exports.getUserById = async (userId) => {
    try {
        const query = 'SELECT * FROM users WHERE user_id = $1';
        const values = [userId];
        const { rows } = await pool.query(query, values);
        return rows[0]; // Return the first row (user) from the result
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving user from database');
    }
};

// Add a task ID to the user's array of task IDs
exports.addTaskToUser = async (userId, taskId) => {
    try {
        const query = 'UPDATE users SET tasks = array_append(tasks, $1) WHERE user_id = $2';
        const values = [taskId, userId];
        await pool.query(query, values);
    } catch (error) {
        console.error("Error removing list from user:", error);
    }

};

// Add a list ID to the user's array of list IDs
exports.addListToUser = async (userId, listId) => {
    try {
        const query = 'UPDATE users SET lists = array_append(lists, $1) WHERE user_id = $2';
        const values = [listId, userId];
        await pool.query(query, values);
    } catch (error) {
        console.error("Error removing list from user:", error);
    }

};

// Remove a task ID from the user's array of task IDs
exports.removeTaskFromUser = async (userId, taskId) => {
    try {
        const query = 'UPDATE users SET tasks = array_remove(tasks, $1) WHERE user_id = $2';
        const values = [taskId, userId];
        await pool.query(query, values);
    } catch (error) {
        console.error("Error removing list from user:", error);
    }
};

// Remove a list ID from the user's array of list IDs
exports.removeListFromUser = async (userId, listId) => {
    try {
        const query = 'UPDATE users SET lists = array_remove(lists, $1) WHERE user_id = $2';
        const values = [listId, userId];
        await pool.query(query, values);
    } catch (error) {
        console.error("Error removing list from user:", error);
    }
};