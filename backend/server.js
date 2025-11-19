import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" })); // katta rasm uchun
app.use(express.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB ulandi"))
  .catch((err) => console.log(err));

import Post from "./models/Post.js";

app.post("/posts", async (req, res) => {
  try {
    const newPost = new Post({
      userId: req.body.userId,
      displayName: req.body.displayName,
      photoURL: req.body.photoURL,
      text: req.body.text,
      images: req.body.images, // Base64 rasm
    });

    await newPost.save();
    res.json({ msg: "Post yaratildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // so‘nggi postlar birinchi
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server ${process.env.PORT} portda ishlamoqda`)
);
