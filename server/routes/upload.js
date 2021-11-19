const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')
const uploadController = require("../controllers/uploadController");

const multer = require('multer')

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


router.post('/image', auth.verifyToken, upload.single('image'), uploadController.saveImagen);

router.get('/image', auth.verifyToken, uploadController.getImagen);

router.delete('/image', auth.verifyToken, uploadController.deleteImagen);

module.exports = router;