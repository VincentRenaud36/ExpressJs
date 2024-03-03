const User = require('../models/user');

exports.getProfil = async (req, res) => {
    try {
        const user = await User.findOne({ where: { pseudo: req.query.pseudo } });

        if (!user) {
            return res.status(404).json({ error: "utilisateur non trouvé" });
        }

        return res.json({
            pseudo: user.pseudo,
            prenom: user.prenom,
            nom: user.nom,
            email: user.email
        });
    } catch (error) {
        console.error('KO', error);
        return res.status(500).json({ error: "Internal server error" });
    }
};