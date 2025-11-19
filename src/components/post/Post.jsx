import { useEffect, useState } from "react";
import axios from "axios";
import "./post.css";

function Carousel({ images }) {
  const [index, setIndex] = useState(0);

  let startX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      // chapga surildi → keyingi rasm
      if (index < images.length - 1) setIndex(index + 1);
    } else if (endX - startX > 50) {
      // o‘ngga surildi → oldingi rasm
      if (index > 0) setIndex(index - 1);
    }
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, i) => (
          <img key={i} src={img} className="carousel-image" alt="" />
        ))}
      </div>

      {images.length > 1 && (
        <div className="carousel-dots">
          {images.map((_, i) => (
            <div key={i} className={`dot ${i === index ? "active" : ""}`}></div>
          ))}
        </div>
      )}
    </div>
  );
}

function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("https://rasm-1.onrender.com/posts");
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-container">
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          {/* Header */}
          <div className="post-header">
            <img src={post.photoURL} className="user-avatar" alt="" />
            <strong>{post.displayName}</strong>
          </div>

          {/* Rasmlar Instagram uslubida */}
          <Carousel images={post.images} />

          {/* Matn */}
          <p className="post-text">{post.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Post;
