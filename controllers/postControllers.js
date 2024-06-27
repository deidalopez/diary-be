import Post from "../models/post.js";
import mongoose, { mongo } from "mongoose";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 }); // sort by createdAt in descending order
    return res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "does not exist" });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "does not exist" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  const { date, title, content } = req.body;

  try {
    const post = await Post.create({ date, title, content });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "does not exist" });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "does not exist" });
    }
    const deletedPost = await Post.findOneAndDelete({ _id: id });
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "does not exist" });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "does not exist" });
    }
    const updatedPost = await Post.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
