const TaskService = require('../services/taskServices');
const UserService = require('../services/userServices');
const ListService = require('../services/listServices');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const user_id = req.data.user.user_id;
        const { content, priority, deadline } = req.body;
        const list_id = req.params.listId;
        const list = await ListService.getListById(list_id);

        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }
        
        // Validate content field
        if (!content || typeof content !== 'string' || content.length === 0 || content.length > 250) {
            return res.status(400).json({ message: "Content must be a non-empty string with maximum 250 characters" });
        }

        // Validate priority field
        const allowedPriorities = ["High", "Medium", "Low", null];
        if (priority && !allowedPriorities.includes(priority)) {
            return res.status(400).json({ message: "Invalid priority value. Allowed values are High, Medium, Low, or null" });
        }

        // Validate deadline field
        if (deadline && isNaN(Date.parse(deadline))) {
            return res.status(400).json({ message: "Invalid deadline value. Please provide a valid timestamp or null" });
        }

        const status = false;

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

// Get All task by list Id
exports.getAllTask = async (req, res) => {
    try {
        const list_id = req.params.listId;
        const user_id = req.data.user.user_id;
        const list = await ListService.getListById(list_id);

        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }

        if (user_id != list.user_id) {
            return res.status(401).json({ message: "Unauthorized, You cannot access this list." });
        }

        const tasks = [];
        for (const taskId of list.tasks) {
            const task = await TaskService.getTaskById(taskId);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            tasks.push(task); // Add task to the tasks array
        }
        res.json(tasks); // Send the tasks array as a response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// Get a task by ID
exports.getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const list_id = req.params.listId;
        const user_id = req.data.user.user_id;
        const task = await TaskService.getTaskById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (task.user_id != user_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (task.list_id != list_id) {
            return res.status(404).json({ message: "Task not found in the list" });
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
        const user_id = req.data.user.user_id;
        const list_id = req.params.listId;
        const taskId = req.params.taskId;
        const task = await TaskService.getTaskById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.user_id != user_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (task.list_id != list_id) {
            return res.status(404).json({ message: "Task not found in the list" });
        }


        const { content, status, priority, deadline } = req.body;
        // Validate content field
        if (!content || typeof content !== 'string' || content.length === 0 || content.length > 250) {
            return res.status(400).json({ message: "Content must be a non-empty string with maximum 250 characters" });
        }

        // Validate priority field
        const allowedPriorities = ["High", "Medium", "Low", null];
        if (priority && !allowedPriorities.includes(priority)) {
            return res.status(400).json({ message: "Invalid priority value. Allowed values are High, Medium, Low, or null" });
        }

        // Validate deadline field
        if (deadline && isNaN(Date.parse(deadline)) || Date.parse(deadline) <= Date.now()) {
            return res.status(400).json({ message: "Invalid deadline value. Please provide a valid timestamp or null" });
        }

        // Check if status is a boolean or null
        if (!status && typeof status !== 'boolean') {
            return res.status(400).json({ message: "Invalid status value. Status must be a non-null boolean value ." });
        }

        const updatedTask = await TaskService.updateTask(taskId, content, priority, status, deadline);
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const user_id = req.data.user.user_id;
        const taskId = req.params.taskId;
        const list_id = req.params.listId;
        const task = await TaskService.getTaskById(taskId);

        if (task.user_id != user_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (task.list_id != list_id) {
            return res.status(404).json({ message: "Task not found in the list" });
        }
        await UserService.removeTaskFromUser(taskId);
        await ListService.removeTaskFromList(taskId);
        const deletedTask = await TaskService.deleteTask(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
