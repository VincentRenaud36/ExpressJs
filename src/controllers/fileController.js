const Image = require('../models/Image');
const multer = require('multer');
const { all } = require('../routes/routes');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const filter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: filter });

exports.postImage = upload.single('image'), async (req, res) => {
    try {
        if(!req.file){
            return res.status(400).send('Veuillez envoyer un fichier');
        }
        const newImage = await Image.create({
            imageName: req.file.originalname,
            imagePath: req.file.path
        });
        res.status(201).send('OK');
    } catch (error) {
        console.error(error);
        res.status(500).send('KO');
    }
};