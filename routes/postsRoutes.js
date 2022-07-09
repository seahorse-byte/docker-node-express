// import express
const express = require("express");
const postController = require("../controllers/postControllers");
const protect = require("../middleware/authMiddleware");

// create a router
const router = express.Router();

// get router instance
router
  .route("/")
  .get(postController.getAllPosts)
  .post(protect, postController.createPost);

router
  .route("/:id")
  .get(postController.getOnePost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

// export the router
module.exports = router;
