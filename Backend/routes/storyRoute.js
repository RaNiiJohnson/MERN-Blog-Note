const storyController = require("../controllers/storyController");
const { uploadImage, upload } = require("../controllers/uploadStoryController");
const requireAuth = require("../middleware/authMiddleware");
const router = require("express").Router();

router.get("/", storyController.getStory);
router.post("/post", requireAuth, storyController.createStory);
router.put("/:id", storyController.updateStory);
router.delete("/:id", requireAuth, storyController.deleteStory);
router.patch("/like-post/:id", storyController.likeStory);
router.patch("/unlike-post/:id", storyController.unlikeStory);

//commentaire
router.patch("/comment-post/:id", storyController.commentStory);
router.patch(
  "/edit-comment-post/:id",
  requireAuth,
  storyController.editCommentStory
);
router.patch("/delete-comment-post/:id", storyController.deleteCommentStory);

router.post("/upload", requireAuth, uploadImage, upload);

module.exports = router;
