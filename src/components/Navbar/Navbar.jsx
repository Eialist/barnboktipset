import logo from "../../assets/icons/barnboktipset-icon.png";
import search from "../../assets/icons/search1.png";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import profile from "../../assets/icons/profile-user.png";

// eslint-disable-next-line
const Navbar = ({ props }) => {
  const [navIcon, setNavIcon] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setNavIcon(props);
    // eslint-disable-next-line
  }, []);

  const handleNavigate = (navIcon) => {
    if (navIcon === "profile") {
      navigate("/search");
    } else if (navIcon === "search") {
      navigate("/user");
    }
  };

  console.log(navIcon);

  return (
    <div className="navbar-container d-flex justify-content-between">
      <div className="d-flex align-items-end">
        <img src={logo} alt="" width={50} />
        <p>Barnboktipset</p>
      </div>
      <img
        src={navIcon === "profile" ? search : profile}
        alt=""
        width={25}
        className="mb-2 mr-1"
        onClick={() => handleNavigate(navIcon)}
      />
    </div>
  );
};

export default Navbar;
