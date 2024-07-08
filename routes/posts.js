import express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/postControllers.js";

import { requireAuth } from "../middleware/auth.js";

const router = express.Router(); // will accumulate all the routes and export them at once
router.use(requireAuth); // this will run before the other routes if it passes

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
