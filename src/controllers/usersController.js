const User = require('../models/user');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('KO');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id  = req.params.id;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        await user.destroy();
        res.json({ message: 'Utilisateur supprimé' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('KO');
    }
};

exports.banUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        user.isBanned = !user.isBanned;
        await user.save();
        res.json({ message: 'Utilisateur banni' });
    } catch (error) {
        console.error(error);
        res.status(500).send('KO');
    }
};

exports.makeAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        user.isAdmin = true;
        await user.save();
        res.json({ message: 'Utilisateur promu' });
    } catch (error) {
        console.error(error);
        res.status(500).send('KO');
    }
};

exports.removeAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        user.isAdmin = false;
        await user.save();
        res.json({ message: 'Utilisateur rétrogradé' });
    } catch (error) {
        console.error(error);
        res.status(500).send('KO');
    }
};