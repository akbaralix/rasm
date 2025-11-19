import { useState } from "react";
import axios from "axios";
import "./create.css";

function Create() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [coption, setCoption] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      alert("Max 10 ta rasm yuklash mumkin!");
      return;
    }

    const base64Images = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        base64Images.push(reader.result);
        if (base64Images.length === files.length) {
          setSelectedImages(base64Images);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const tayyor = async () => {
    if (selectedImages.length === 0) {
      alert("Iltimos post uchun rasm tanlang!");
      return;
    }
    if (!coption && selectedImages.length === 0) {
      alert("Matn yoki rasm kiriting!");
      return;
    }

    try {
      await axios.post("https://rasm-5ano.onrender.com/posts", {
        userId: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: coption,
        images: selectedImages, // Base64 rasmlar
      });

      alert("Post yaratildi!");
      setCoption("");
      setSelectedImages([]);
    } catch (err) {
      console.log(err);
      alert("Xatolik yuz berdi!");
    }
  };

  return (
    <div className="create-container">
      <div className="post-create">
        <div className="impor-img">
          <input
            type="file"
            id="file"
            multiple
            onChange={handleFileChange}
            className="file-input"
          />
          <label htmlFor="file">Rasm Tanlang (max 10)</label>
        </div>

        <div className="image-preview-container">
          {selectedImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={"preview-" + index}
              className="image-preview"
            />
          ))}
        </div>

        <textarea
          name="post"
          className="post-coption"
          placeholder="Postga habar kiriting..."
          value={coption}
          onChange={(e) => setCoption(e.target.value)}
        />

        <button onClick={tayyor} className="tayyor">
          Tayyor
        </button>
      </div>
    </div>
  );
}

export default Create;
