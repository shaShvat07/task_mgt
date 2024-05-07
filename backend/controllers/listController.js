const ListService = require('../services/listServices');

// Create a new list
exports.createList = async (req, res) => {
    try {
        const { title } = req.body;
        const user_id = req.data.user.user_id; // Assuming user ID is stored in the token
        const list = await ListService.createList(user_id, title);
        res.status(201).json(list);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all lists for a user
exports.getAllListsByUserId = async (req, res) => {
    try {
        const user_id = req.data.user.user_id; // Assuming user ID is stored in the token
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
        const listId = req.params.listId;
        const list = await ListService.getListById(listId);
        if (!list) {
            return res.status(404).json({ message: "List not found" });
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
        const listId = req.params.listId;
        const { title } = req.body;
        const list = await ListService.updateList(listId, title);
        if (!list) {
            return res.status(404).json({ message: "List not found" });
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
        const listId = req.params.listId;
        const list = await ListService.deleteList(listId);
        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }
        res.json({ message: "List deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
