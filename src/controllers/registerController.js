const User = require('../models/user');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

// exports.postRegister = async (req, res) =>{
//     try{
//         const { pseudo, password, nom, prenom, email } = req.body;
//         const existingUser = await User.findOne({
//             where: {
//                 [Op.or]: [{email: email}, {pseudo: pseudo}]
//             }
//         });

//         if(!pseudo || !password || !nom || !prenom || !email){ {
//             res.status(400).send("Champ manquant");
//         }

//         if(existingUser){
//             return res.status(400).json({error: 'Email ou pseudo déjà utilisé'})
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = await User.create({
//             pseudo,
//             password,
//             nom,
//             prenom,
//             email
//         });
//         res.status(201).send('OK');
//     }
// }
//     catch (error){res.status(500).send('KO');}
// };

// exports.postRegister = async (req, res) => {
//     try {
        
//         const { pseudo, password, nom, prenom, email } = req.body;
//         const existingUser = await User.findOne({
//             where: {
//                 [Op.or]: [{ email: email }, { pseudo: pseudo }]
//             }
//         });
//         if(existingUser){
//             return res.status(400).json({error: 'Email ou pseudo déjà utilisé'})
//         }
//         if(!pseudo || !password || !nom || !prenom || !email){ {
//             res.status(400).send("Champ manquant");
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = await User.create({
//             pseudo,
//             password: hashedPassword,
//             nom,
//             prenom,
//             email
//         });
//         res.status(201).send("OK");
//     } catch (error) {
//         res.status(500).send("KO");
//     }
// };

exports.postRegister = async (req, res) => {
    try {
        
        const { pseudo, password, nom, prenom, email } = req.body;

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email: email }, { pseudo: pseudo }]
            }
        });
        if (existingUser) {
            return res.status(400).json({ error: 'Email ou pseudo déjà utilisé' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            pseudo,
            password: hashedPassword,
            nom,
            prenom,
            email
        });

        res.status(201).send("OK");
    } catch (error) {
        console.error('Error while registering user:', error);
        res.status(500).send("KO");
    }
};