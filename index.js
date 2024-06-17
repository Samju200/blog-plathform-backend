const express = require("express");
const cors = require("cors");
const connectionDb = require("./config/db");
// const transporter = require('./config/mailer');
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
connectionDb();
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

app.use("/api/comments", commentRoutes);

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
