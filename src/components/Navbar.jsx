import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); // <== ADD

  return (
    <div className="container text-center">
      <nav className="starter-nav">
        <Link to="/">
          <button>Home</button>
        </Link>

        {isLoggedIn && (
          <>
            <button onClick={logOutUser}>Logout</button>
            <span>Hello {user && user.username}</span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
