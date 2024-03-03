const User = require('../models/user');

const banList = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await User.findByPk(userId);

        if (user.isBanned) {
            return res.status(403).json({ error: "Vous êtes bannis" });
        }

        next();
    } catch (error) {
        console.error("Error checking ban status:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = checkBan;