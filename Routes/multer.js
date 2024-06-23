const multer = require('multer');
const fs = require('fs');
const path = require('path');
const dir = 'D:\\Women\\HackNagpur-Pragati-Backend\\uploads\\';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir)  
    },
    filename: function (req, file, cb) {
        // Replace colons with hyphens in the ISO string
        const now = new Date().toISOString().replace(/:/g, '-');
        cb(null, now + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb("Error: File upload only supports the following filetypes - " + filetypes);
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 20}, // max upload size
    fileFilter: fileFilter
})

module.exports = upload;