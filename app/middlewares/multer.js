const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Math.floor(Math.random() * 99999999) + '_' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true)
    } else {
        cb(
            {
                message: "unsupported file format"
            },
            false
        )
    }
}

const uploadMidleware = multer({
    storage,
    limits: {
        fileSize: 3000000,
    },
    fileFilter: fileFilter
})

module.exports = uploadMidleware