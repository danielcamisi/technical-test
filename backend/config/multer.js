const multer = require("multer");

const path = require("path")

const storage = multer.diskStorage({

    destination:function(req,file,cb){
        cb(null, "uploads/")
    },

    filename: function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname));
    },
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Apenas arquivos .png, .jpg e .jpeg são permitidos!'));
    }
  }
});

module.exports = upload