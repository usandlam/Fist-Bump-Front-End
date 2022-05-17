import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

import LoginPage from "../pages/LoginPage";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = (e) => {
    // e.target.focus();
    document.querySelector(".modal").focus();
    setShowLogin(false);
  };

  const handleShowLogin = (e) => {
    setShowLogin(true);
  };

  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); // <== ADD

  return (
    <div className="container text-center">
      <nav className="menu">
        <input
          type="checkbox"
          href="#"
          className="menu-open"
          name="menu-open"
          id="menu-open"
        />
        <label className="menu-open-button" htmlFor="menu-open">
          <span className="lines line-1" />
          <span className="lines line-2" />
          <span className="lines line-3" />
        </label>

        <a href="#" className="menu-item blue">
          {" "}
          <i className="fa fa-anchor" />{" "}
        </a>
        <a href="#" className="menu-item green">
          {" "}
          <i className="fa fa-coffee" />{" "}
        </a>
        <a href="#" className="menu-item red">
          {" "}
          <i className="fa fa-heart" />{" "}
        </a>
        <a href="#" className="menu-item purple">
          {" "}
          <i className="fa fa-microphone" />{" "}
        </a>
        <a href="#" className="menu-item orange">
          {" "}
          <i className="fa fa-star" />{" "}
        </a>
        <a href="#" className="menu-item lightblue">
          {" "}
          <i className="fa fa-diamond" />{" "}
        </a>
      </nav>

      <div className="col simple-nav d-flex align-items-center justify-content-evenly pt-1">
        <Link className="btn btn-outline-info" to="/">
          Home
        </Link>

        {isLoggedIn && (
          <>
            <button
              type="button"
              className="btn btn-outline-warning"
              onClick={logOutUser}
            >
              Logout
            </button>

            <Link className="btn btn-outline-info" to="/profile">
              Profile
            </Link>

            <span>Hello {user && user.username}</span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link className="btn btn-outline-info" to="/signup">
              Sign Up
            </Link>
            <Link className="btn btn-outline-info" to="/login">
              Login
            </Link>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target=".modal"
              className="btn btn-outline-info"
              to="/login"
            >
              Login Modal
            </button>
          </>
        )}
      </div>
      <div className="modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
              <LoginPage />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
