import { NavLink } from "react-router-dom";
import { GrHomeRounded, GrGallery } from "react-icons/gr";
import { GoSearch } from "react-icons/go";
import { CgAdd, CgProfile } from "react-icons/cg";
import "./navbar.css";

function Navbar() {
  return (
    <div className="header">
      <div className="logo">
        <a href="/">RASM</a>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <GrHomeRounded />
              <p>Uy</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/search"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <GoSearch />
              <p>Qidiruv</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/create"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <CgAdd />
              <p>Yaratish</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/post"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <GrGallery />
              <p>Postlar</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profil"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <CgProfile />
              <p>Profil</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
