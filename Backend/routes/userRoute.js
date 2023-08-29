const router = require("express").Router();
const userRoutes = require("../controllers/userController");
const { upload, uploadImage } = require("../controllers/uploadController");
const requireAuth = require("../middleware/authMiddleware");

router.get("/", userRoutes.getUser);
router.get("/:id", userRoutes.userInfo);
router.post("/signup", userRoutes.signup);
router.post("/login", userRoutes.login);
router.patch("/follow/:id", userRoutes.follow);
router.patch("/unfollow/:id", userRoutes.unfollow);
//image
router.post("/upload", requireAuth, uploadImage, upload);
module.exports = router;
