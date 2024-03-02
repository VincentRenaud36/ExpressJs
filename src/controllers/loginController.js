const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
    const { pseudo, password } = req.body;

    try {
        const user = await User.findOne({ where: { pseudo } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Bad credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        return res.json({ token });
    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ error: "Erreur" });
    }
};
