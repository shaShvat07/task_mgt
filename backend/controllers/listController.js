const ListService = require('../services/listServices');
const UserService = require('../services/userServices');
const TaskService = require('../services/taskServices');
// Create a new list
exports.createList = async (req, res) => {
    try {
        const user_id = req.data.user.user_id;
        // Validate title field
        const { title } = req.body;
        if (!title || typeof title !== 'string' || title.length === 0 || title.length > 100) {
            return res.status(400).json({ message: "Title must be a non-empty string with maximum 100 characters" });
        }
        const list = await ListService.createList(user_id, title);
        // Update user's array of task IDs
        await UserService.addListToUser(user_id, list.list_id);
        res.status(201).json(list);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all lists for a user
exports.getAllListsByUserId = async (req, res) => {
    try {
        const user_id = req.data.user.user_id;
        const lists = await ListService.getAllListsByUserId(user_id);
        res.json(lists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get a list by ID
exports.getListById = async (req, res) => {
    try {
        const user_id = req.data.user.user_id;
        const listId = req.params.listId;
        const list = await ListService.getListById(listId);
        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }
        if (user_id != list.user_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        res.json(list);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update a list
exports.updateList = async (req, res) => {
    try {
        const user_id = req.data.user.user_id;
        const listId = req.params.listId;
        const { title } = req.body;
        const list = await ListService.updateList(listId, title);
        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }
        if (user_id != list.user_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        res.json(list);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete a list
exports.deleteList = async (req, res) => {
    try {
        const user_id = req.data.user.user_id;
        const listId = req.params.listId;
        const list = await ListService.getListById(listId);
        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }

        if (user_id != list.user_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        await UserService.removeListFromUser(user_id, listId);
        // Delete each task associated with the list
        if (list.tasks) {
            for (const taskId of list.tasks) {
                await UserService.removeTaskFromUser(user_id, taskId);
                await TaskService.deleteTask(taskId);
            }
        }

        const Deletedlist = await ListService.deleteList(listId);

        if (!Deletedlist) {
            return res.status(404).json({ message: "List not found" });
        }
        res.json({ message: "List deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
