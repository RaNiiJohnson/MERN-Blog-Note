const multer = require("multer");
const Story = require("../Models/storyModel");

let filename;
const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../Frontend/public/uploads/posts/");
  },
  filename: async (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    filename = `post-${req.user.id}.${Date.now()}.${ext}`;
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
  try {
    const post = req.body.post;
    const picture = "/uploads/posts/" + filename;
    const author = req.user.name;
    console.log(author);
    const story = await Story.create({ author, post, picture });
    res.status(200).json(story);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
