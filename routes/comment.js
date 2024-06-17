const express = require("express");
const Comment = require("../models/Comment");
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

// Add comment
router.post("/:postId", auth, async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    try {
        const comment = new Comment({
            content,
            author: req.userId,
            post: postId,
        });
        await comment.save();
        res.status(201).send(comment);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get comments for a post
router.get("/:postId", async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await Comment.find({ post: postId }).populate(
            "author",
            "username"
        );
        res.send(comments);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
