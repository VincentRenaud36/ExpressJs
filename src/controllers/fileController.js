const Image = require('../models/Image');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const filterFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: filterFilter });

// exports.postFile = upload.single('file');

// exports.postFileHandler = async (req, res) => {
//     try {
//         if(!req.file){
//             return res.status(400).send('Veuillez envoyer un fichier');
//         }
//         await Image.create({
//             fileName: req.file.originalname,
//             filePath: req.file.path
//         });
//         res.send('OK');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('KO');
//     }
// };

exports.postFile = async(req, res) => {
    upload.single('file')(req, res, async function (err){
        if(err instanceof multer.MulterError){
            return res.status(500).send('Erreur');
        }else if(err){
            return res.status(500).send('Erreur');
        }
        try{
            await File.create({filename: req.file.originalname, filepath: req.file.path});
            req.send('File uploaded');
        }catch(error){
            res.status(500).json('Erreur enregistrement dans la bdd');
        }
})};
