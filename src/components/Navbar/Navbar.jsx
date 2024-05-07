import logo from "../../assets/icons/barnboktipset-icon.png";
import search from "../../assets/icons/search1.png";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import profile from "../../assets/icons/profile-user.png";

// eslint-disable-next-line
const Navbar = ({ props }) => {
  const [navIcon, setNavIcon] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUser(sessionStorage.getItem("userInfo"));
    setNavIcon(props);
    // eslint-disable-next-line
  }, []);

  const handleNavigate = () => {
    if (navIcon === "profile" || navIcon === undefined) {
      navigate("/search");
    } else if (navIcon === "search" && user) {
      navigate("/user");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="navbar-container d-flex justify-content-between">
      <div className="d-flex align-items-end">
        <img src={logo} alt="" width={50} />
        <p>Barnboktipset</p>
      </div>
      <img
        src={navIcon === "search" ? profile : search}
        alt=""
        width={25}
        className="mb-2 mr-1"
        onClick={() => handleNavigate()}
      />
    </div>
  );
};

export default Navbar;
