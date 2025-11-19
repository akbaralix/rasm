import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import Search from "./components/search/Search";
import Post from "./components/post/Post";
import Create from "./components/create/Create";
import Profil from "./components/profile/Profil";
import Navbar from "./components/navbar/Navbar";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/post" element={<Post />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
