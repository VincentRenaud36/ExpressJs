const Image = require('../models/Image');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/');
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

exports.postFile = upload.single('file');

exports.postFileHandler = async (req, res) => {
    try {
        if(!req.file){
            return res.status(400).send('Veuillez envoyer un fichier');
        }
        const newImage = await Image.create({
            fileName: req.file.originalname,
            filePath: req.file.path
        });
        res.json(newImage);
    } catch (error) {
        console.error(error);
        res.status(500).send('KO');
    }
};