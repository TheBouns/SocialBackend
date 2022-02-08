const multer = require("multer");
const upload = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now() + ".jpg");
  },
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("images/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "this is not a accepted file extension" }, false);
    }
  },
});

const uploadGenerator = multer({ storage: upload });

module.exports = uploadGenerator;
