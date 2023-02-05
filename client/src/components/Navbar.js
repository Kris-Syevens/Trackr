import Logo from "./Logo";
import Wrapper from "../assets/wrappers/Navbar";
import { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";

const Navbar = () => {
  const { toggleDarkmode, toggleSidebar, user, logoutUser, showDarkmode } =
    useAppContext();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem("darkMode", showDarkmode ? "true" : "false");
  }, [showDarkmode]);

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>

        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaUserCircle />
            {user?.firstName}
            <FaCaretDown />
          </button>

          <div className={showMenu ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              logout
            </button>
            <button
              type="button"
              className="dropdown-btn"
              onClick={toggleDarkmode}
            >
              {showDarkmode ? (
                <BsFillSunFill className="theme-icon" />
              ) : (
                <BsFillMoonFill className="theme-icon" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
