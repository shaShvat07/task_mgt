const { pool } = require('../config/dbConfig');

// Create a new task
exports.createTask = async (list_id, user_id, title, content, priority, status, deadline) => {
    const query = 'INSERT INTO tasks (list_id, user_id, content, priority, status, deadline, title) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [list_id, user_id, content, priority, status, deadline, title];
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
exports.updateTask = async (taskId, updatedFields) => {
    // Generate the SET clause dynamically based on the provided fields
    const setClauses = [];
    const values = [];
    Object.keys(updatedFields).forEach((key, index) => {
        setClauses.push(`${key} = $${index + 1}`);
        values.push(updatedFields[key]);
    });
    values.push(taskId); // Add taskId as the last value
    const setClauseString = setClauses.join(', ');
    const query = `UPDATE tasks SET ${setClauseString} WHERE task_id = $${values.length} RETURNING *`;
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

//query search
exports.searchQuery = async (searchText) => {
    const query = 'SELECT * FROM tasks WHERE title ILIKE $1';
    const values = [searchText];
    const { rows } = await pool.query(query, values);
    return rows; // Return all rows matching the search query
}
