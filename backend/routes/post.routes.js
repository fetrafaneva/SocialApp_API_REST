import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js"; // middleware à créer pour JWT
import { createPost, getPosts } from "../controllers/post.controller.js";

const router = express.Router();

// routes publiques
router.get("/", getPosts);

// routes protégées
router.post("/", authMiddleware, createPost);

export default router;
