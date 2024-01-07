const multer = require("multer");
const User = require("../Models/userModel");
let filename;
const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../Frontend/public/uploads/profil/");
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    filename = `image-${req.user.name}${Date.now()}.${ext}`;
    callback(null, filename);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Veuillez uploader que des images"));
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: isImage,
});

module.exports.uploadImage = upload.single("photo");

module.exports.upload = async (req, res) => {
  console.log(req.file);
  await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        picture: "/uploads/profil/" + filename,
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: +err });
    });
};
