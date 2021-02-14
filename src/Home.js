import React from "react";
import "./App.css";
import { Button } from "./components/Button/Button";
import "./Home.css";

function Home() {
  return (
    <div>
      <video src="/videos/video-2.mp4" autoPlay loop muted />
      <div className="hero-container">
        <h1>Welcome to AGENT</h1>
        <p>Elegant Reinforcement Learning UI</p>
        <div className="hero-btns">
          <Button
            directTo="/envagent"
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            Get Started
          </Button>
          <Button
            directTo="/"
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            Learn more<i className="far fa-play-circle" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
