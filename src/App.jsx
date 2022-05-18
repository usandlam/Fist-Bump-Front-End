import "./App.css";
import React, { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import UserPage from "./pages/UserPage";
import ResolveUser from "./components/ResolveUser";
import StatsPage from "./pages/StatsPage";

import IsPrivate from "./components/IsPrivate";

import IsAnon from "./components/IsAnon";

// eslint-disable-next-line no-undef
const subDir = window.location.host.split(".")[0] === "g";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/to/:user"
          element={
            <IsPrivate>
              <UserPage />
            </IsPrivate>
          }
        />
        <Route
          path="/my-daps"
          element={
            <IsPrivate>
              <StatsPage />
            </IsPrivate>
          }
        />
        {subDir && (
          <>
            <Route path="/:tagId" element={<UserPage />} />
            <Route path="/f/:tagId" element={<ResolveUser />} />
            {/* <Route path="/*">
              <Navigate to="/" />
            </Route> */}
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
