const { pool } = require('../config/dbConfig');

// Create a new task
exports.createTask = async (list_id, user_id, content, priority, status, deadline) => {
    const query = 'INSERT INTO tasks (list_id, user_id, content, priority, status, deadline) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [list_id, user_id, content, priority, status, deadline];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Get a task by ID
exports.getTaskById = async (taskId) => {
    const query = 'SELECT * FROM tasks WHERE task_id = $1';
    const values = [taskId];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Update a task
exports.updateTask = async (taskId, content, priority, status, deadline) => {
    // Ensure status is provided, set to default value if not provided
    const query = 'UPDATE tasks SET content = $1, priority = $2, status = $3, deadline = $4 WHERE task_id = $5 RETURNING *';
    const values = [content, priority, status, deadline, taskId];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Delete a task
exports.deleteTask = async (taskId) => {
    const query = 'DELETE FROM tasks WHERE task_id = $1 RETURNING *';
    const values = [taskId];
    const { rows } = await pool.query(query, values);
    return rows[0];
};
