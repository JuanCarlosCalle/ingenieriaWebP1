let path = require('path');
let multer = require('multer');
let crypto = require('crypto');

let storage = multer.diskStorage({
    destination: './public/',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err);

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
});

let upload = multer({storage: storage});
module.exports = upload;