const UserService = require('../services/userServices');

// Get a list by ID
exports.getUserById = async (req, res) => {
    const userId = req.data.user.user_id;
    try {
        // Fetch user data from the database using the provided userId
        const user = await UserService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if the requested user matches the user associated with the token
        if (userId == req.data.user.user_id) {
            res.json({ data: user });
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
