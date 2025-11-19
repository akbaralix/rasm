import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/login.css";

function Login() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) navigate("/profil");
  }, [user, navigate]);

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const userData = {
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };

        // Foydalanuvchini backendga saqlash
        try {
          await axios.post("https://rasm-1.onrender.com/users", userData);
        } catch (err) {
          console.log("User saqlashda xatolik:", err);
        }

        // LocalStorage ga yozish
        localStorage.setItem("user", JSON.stringify(userData));

        navigate("/profil");
      })
      .catch((err) => console.log("Google login xato:", err));
  };

  return (
    <div className="login">
      <h2>Akkuntga kirish</h2>

      <button onClick={handleGoogleLogin}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt=""
        />
        <p>Google bilan kirish</p>
      </button>

      <p className="faq-gogle">Hozirda faqat Google orqali kirish mavjud</p>
    </div>
  );
}

export default Login;
