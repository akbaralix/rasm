import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../post/Post";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="home">
      {/* Foydalanuvchi profil info */}
      <div className="user-profil">
        <div className="user-profil-img">
          <img src={user.photoURL} alt={user.displayName} />
        </div>
      </div>

      {/* Barcha postlar */}
      <Post />
    </div>
  );
}

export default Home;
