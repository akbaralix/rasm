import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profil.css";

function Profil() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchUserPosts();
    }
  }, [user, navigate]);

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get("https://rasm-gm3r.onrender.com/posts");
      // Foydalanuvchining postlarini filter qilish
      const posts = res.data.filter((p) => p.userId === user.uid);
      setUserPosts(posts);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="profil">
      <div className="profil-header">
        <div className="user-profil-img">
          <img src={user.photoURL} alt={user.displayName} />
        </div>
        <div className="profil-info">
          <h3>{user.displayName}</h3>
          <p>{userPosts.length} Post</p>
        </div>
        <button className="logout-btn" onClick={logout}>
          Chiqish
        </button>
      </div>

      <div className="user-posts">
        {userPosts.length === 0 ? (
          <p>Post yo‘q</p>
        ) : (
          userPosts.map((post) => (
            <div key={post._id} className="post-card">
              {/* Post rasmlari (carousel qilish mumkin) */}
              <div className="carousel-container">
                <div className="carousel-track">
                  {post.images?.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`post-${i}`}
                      className="carousel-image"
                    />
                  ))}
                </div>
              </div>
              {/* Post matni */}
              <p className="post-text">{post.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profil;
