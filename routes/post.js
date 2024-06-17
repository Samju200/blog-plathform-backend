const express = require("express");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to verify token
const auth = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, "your_jwt_secret");
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).send("Unauthorized");
    }
};

// Create post
router.post("/", auth, async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = new Post({ title, content, author: req.userId });
        await post.save();
        res.status(201).send(post);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Read posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username");
        res.send(posts);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update post
router.put("/:id", auth, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const post = await Post.findOneAndUpdate(
            { _id: id, author: req.userId },
            { title, content },
            { new: true }
        );
        if (!post) {
            return res.status(404).send("Post not found");
        }
        res.send(post);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete post
router.delete("/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findOneAndDelete({
            _id: id,
            author: req.userId,
        });
        if (!post) {
            return res.status(404).send("Post not found");
        }
        res.send("Post deleted");
    } catch (err) {
        res.status(400).send(err.message);
    }
});
// Search posts
router.get("/search/:query", async (req, res) => {
    const { query } = req.params;
    try {
        const posts = await Post.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { content: { $regex: query, $options: "i" } },
            ],
        }).populate("author", "username");
        res.send(posts);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
