// import express
const express = require("express");
const postController = require("../controllers/postControllers");

// create a router
const router = express.Router();

// get router instance
router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPost);

router
  .route("/:id")
  .get(postController.getOnePost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

// export the router
module.exports = router;
