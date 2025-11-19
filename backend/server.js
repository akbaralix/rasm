import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Post from "./models/Post.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" })); // katta rasm uchun
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// MongoDB ulanish
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB ulandi"))
  .catch((err) => console.log("MongoDB xato:", err));

// Routes

// POST: yangi post yaratish
app.post("/posts", async (req, res) => {
  try {
    const { userId, displayName, photoURL, text, images } = req.body;

    if (!userId || (!text && (!images || images.length === 0))) {
      return res.status(400).json({ error: "Matn yoki rasm kiriting!" });
    }

    const newPost = new Post({ userId, displayName, photoURL, text, images });
    await newPost.save();

    res.status(201).json({ msg: "Post yaratildi", post: newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: barcha postlarni olish
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serverni ishga tushurish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portda ishlamoqda`));
