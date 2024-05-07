const { pool } = require('../config/dbConfig');

// Add a task ID to the user's array of task IDs
exports.addTaskToUser = async (userId, taskId) => {
    const query = 'UPDATE users SET tasks = array_append(tasks, $1) WHERE user_id = $2';
    const values = [taskId, userId];
    await pool.query(query, values);
};