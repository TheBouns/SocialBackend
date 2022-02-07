const multer = require("multer");
const upload = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("images/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "El tipo de archivo no es válido" }, false);
    }
  },
});

const uploadGenerator = multer({ storage: upload });

module.exports = uploadGenerator;
