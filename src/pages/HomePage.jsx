import { useRef, useEffect } from "react";

import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const API_URL = "http://localhost:5005/api";

function HomePage() {
  const circleRef = useRef(null);

  useEffect(() => {
    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".trigger",
          pin: false,
          start: "top top",
          end: "+=1000",
          scrub: true,
          markers: false,
          toggleClass: "enable",
          // onLeave: () => gsap.set(".lefthand", { position: "absolute fixed" }),
          onLeave: () => componentDidMount(),
        },
      })
      .add("start")
      .to(".lefthand", { xPercent: 250, duration: 4 }, "start")
      .to(".righthand", { xPercent: -250, duration: 4 }, "start");
  }, []);

  const postABump = async (latitude, longitude) => {
    const requestBody = { latitude, longitude };
    console.log(requestBody);
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
      console.log(response);
      console.log("Bump uploaded w/ coordinates");
    } catch (error) {
      const errorDescription = error.response.message;
      console.log(errorDescription);
    }
  };

  const componentDidMount = () => {
    if ("geolocation" in navigator) {
      console.log("Available");

      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log("Latitude: ", lat);
        console.log("Longitude: ", lng);

        postABump(lat, lng);
      });
    }
    console.log("Not Available");
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
