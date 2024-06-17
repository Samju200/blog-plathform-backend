const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Sign-up
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).send("User created");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send("Invalid credentials");
        }
        const token = jwt.sign({ userId: user._id }, "your_jwt_secret");
        res.send({ token });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
