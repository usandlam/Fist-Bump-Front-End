import React, { useRef, useEffect } from "react";

import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const API_URL = "http://localhost:5005/api";

let bumped = false;

function HomePage() {
  const circleRef = useRef(null);

  useEffect(() => {
    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".trigger",
          pin: false,
          start: "top top",
          end: "+=500",
          scrub: true,
          markers: false,
          toggleClass: "enable",
          // onLeave: () => gsap.set(".lefthand", { position: "absolute fixed" }),
          onLeave: () => fistBump(),
        },
      })
      .add("start")
      .to(".lefthand", { xPercent: 250, duration: 4 }, "start")
      .to(".righthand", { xPercent: -250, duration: 4 }, "start");
  }, []);

  const postABump = async (latitude, longitude) => {
    const requestBody = { latitude, longitude };
    try {
      console.log("attempting bump");
      const tryBump = await fetch(`${API_URL}/dap`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const response = await tryBump.json();
      bumped = true;
      console.log("Bump uploaded w/ coordinates");
    } catch (error) {
      const errorDescription = error;
      console.log(errorDescription);
    }
  };

  const ipCheck = async () => {
    const APICall = await fetch("https://geolocation-db.com/json/");
    const APIReply = await APICall.json();
    console.log(APIReply);
    postABump(APIReply.latitude, APIReply.longitude);
  };

  const fistBump = () => {
    console.log(bumped);
    console.log("bump");
    if (bumped) return null;

    if ("geolocation" in navigator) {
      console.log("geo");
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        postABump(lat, lng);
      }, ipCheck);
    } else {
      console.log("Not Available");
      //   ipCheck();
    }
  };

  return (
    <div className="container text-center">
      <h1>Scroll down to bump!</h1>
      <div className="trigger">
        <div className="hand-container">
          <div className="lefthand" />
          <div className="righthand" />
        </div>
      </div>

      <div />
    </div>
  );
}

export default HomePage;
