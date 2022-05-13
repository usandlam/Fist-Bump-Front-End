import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
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
            <button type="button" onClick={logOutUser}>
              Logout
            </button>
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
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
