const TaskService = require('../services/taskServices');
const UserService = require('../services/userServices');
const ListService = require('../services/listServices');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { content, priority, status, deadline } = req.body;
        const list_id = req.params.listId; // Extract list ID from URL parameters
        const user_id = req.data.user.user_id;
        const task = await TaskService.createTask(list_id, user_id, content, priority, status, deadline);
        // Update user's array of task IDs
        await UserService.addTaskToUser(user_id, task.task_id);

        // Update list's array of task IDs
        await ListService.addTaskToList(list_id, task.task_id);
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const list_id = req.params.listId;
        const task = await TaskService.getTaskById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (task.list_id !== list_id) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { content, priority, status, deadline } = req.body;
        const task = await TaskService.getTaskById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const updatedTask = await TaskService.updateTask(taskId, {
            content: content || task.content,
            priority: priority || task.priority,
            status: status || task.status,
            deadline: deadline || task.deadline
        });
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await TaskService.deleteTask(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
