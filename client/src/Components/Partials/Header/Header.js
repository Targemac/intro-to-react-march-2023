import { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../../Assets/graphics/1-11823_circle-location-icon-png-transparent-png.png";

import { UserContext } from "../../../Context/UserContext";

const Header = (props) => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <nav className="main_navbar" id="">
      <div className="logo_box">
        <Link to="/">
          <img src={logo} alt="" /> <span> {props.companyName} </span>
        </Link>
      </div>
      <div className="nav_link_grp">
        <ul>
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/about"> About </Link>
          </li>
          <li>
            <Link to="/services"> Services </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link to="/logout"> Logout </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login"> Login </Link>
              </li>
              <li>
                <Link to="/signup"> SignUp </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
