import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: String,
    displayName: String,
    photoURL: String,
    text: String,
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
