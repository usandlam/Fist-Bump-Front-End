/* eslint-disable no-undef */
import { useParams } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";

import { gsap } from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

// const emojiUnicode = require("emoji-unicode");

const API_URL = "http://localhost:5005/u";

let bumped = false;

function UserPage(props) {
  const [fetching, setFetching] = useState(true);

  const { tagId } = useParams();

  const [errorMessage, setErrorMessage] = useState(undefined);

  const [foundUser, setFoundUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = tagId;
      const tryLookup = await fetch(`${API_URL}/find/${query}`);
      const response = await tryLookup.json();
      setFetching(false);
      setFoundUser(response.message);
    };
    fetchData();
  }, []);

  const circleRef = useRef(null);

  const userHeader = () => {
    if (localStorage.getItem("authToken")) {
      const sendAs = localStorage.getItem("authToken");
      return `Bearer ${sendAs}`;
    }
    return ``;
  };

  const lHandRef = useRef();
  const rHandRef = useRef();

  useEffect(() => {
    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".trigger",
          pin: false,
          start: "top top",
          end: "+=650",
          scrub: true,
          markers: false,
          toggleClass: "enable",
          // onLeave: () => gsap.set(".lefthand", { position: "absolute fixed" }),
          // eslint-disable-next-line no-use-before-define
          onLeave: () => fistBump(),
        },
      })
      .add("start")
      .to(lHandRef.current, { xPercent: 250, duration: 3 }, "start")
      .to(rHandRef.current, { xPercent: -250, duration: 3 }, "start");
  }, []);

  const postABump = async (latitude, longitude) => {
    const requestBody = { latitude, longitude };
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: userHeader(),
      };
      const tryBump = await fetch(`${API_URL}/dap`, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      });
      const response = await tryBump.json();
      bumped = true;
    } catch (error) {
      const errorDescription = error;
    }
  };

  const ipCheck = async () => {
    const APICall = await fetch("https://geolocation-db.com/json/");
    const APIReply = await APICall.json();
    postABump(APIReply.latitude, APIReply.longitude);
  };

  const fistBump = () => {
    if (bumped) return null;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        postABump(lat, lng);
      }, ipCheck);
    }
    return null;
  };

  return (
    <div className="container main text-center">
      {fetching && <p>Loading</p>}
      {!fetching && <h1>Bumping {foundUser}!</h1>}
      <div className="trigger">
        <div className="hand-container">
          <div className="fist lefthand" ref={lHandRef} />
          <div className="fist righthand" ref={rHandRef} />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
