import { Post } from "../models/user.model.js"; // on prend le Post de ton fichier unique

// ------------------ CREATE POST ------------------
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    // req.user sera défini par le middleware auth
    const post = await Post.create({ title, content, author: req.user._id });

    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------ GET ALL POSTS ------------------
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email") // pour voir qui a posté
      .sort({ createdAt: -1 }); // posts récents en premier

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
