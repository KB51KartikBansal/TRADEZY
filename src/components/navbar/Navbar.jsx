import React, { useEffect, useState, useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import authContext from "../../context/auth/authContext";
import { LOG_OUT } from "../../config/typeConstants";

export default function Navbar() {
  const { authState, authDispatch } = useContext(authContext);

  const [isUserLoggedIn, setUserLoggedIn] = useState(authState.isAuthenticated);

  useEffect(() => {
    setUserLoggedIn(authState.isAuthenticated);
  }, [authState.isAuthenticated]);

  return isUserLoggedIn ? (
    <nav className="navbar navbar-expand-sm sticky-top header">
      <Link className="navbar-brand text-dark pl-3" to="/">
        <img
          src="favicon.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="app-logo"
        />{"  "}
        𝐓𝐫𝐚𝐝𝐞𝐳𝐲
      </Link>
      <button
        className="navbar-toggler mr-3"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse  navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active ">
            <Link className="nav-link text-dark pl-3" to="/">
             Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark pl-3" to="/trade-details">
             Trade Details
            </Link>
          </li>
         
          <li className="nav-item">
            <Link className="nav-link text-dark pl-3" to="/alerts">
             Alerts
            </Link>
          </li>
          {/* <div className="ms-auto"> */}
          <li className="nav-item">
            <Link className="nav-link text-dark pl-3" to="/profile">
             Hi {authState.user.userName}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-dark pl-3"
              onClick={() =>
                authDispatch({
                  type: LOG_OUT,
                })
              }
              to="/login"
            >
              Logout <FiLogOut />
            </Link>
          </li>
          {/* </div> */}
        </ul>
      </div>
    </nav>
  ) : (
    <nav className="navbar sticky-top header">
      <Link className="navbar-brand text-dark pl-3" to="/">
        <img
          src="favicon.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="app-logo"
        />
       𝐓𝐫𝐚𝐝𝐞𝐳𝐲
      </Link>
    </nav>
  );
}
