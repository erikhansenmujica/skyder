import React from "react";
import "./css.css";

export default () => {
  return (
    <div className="container">
      <div>
        <h1>DOWNLOAD YOUR FREE BEATS</h1>
        <iframe
          src="//www.beatstars.com/embed/track/?id=4421402"
          width="100%"
          height="140"
          style={{ border: "none" }}
        ></iframe>
        <a
          href="latintrampa.mp3"
          download="freeSkyderBeat.mp3"
          style={{ marginBottom: "20px" }}
        >
          Download for free
        </a>
        <iframe
          src="//www.beatstars.com/embed/track/?id=4590544"
          width="100%"
          height="140"
          style={{ border: "none" }}
        ></iframe>
        <a href="taichu.mp3" download="freeSkyderBeat.mp3">
          Download for free
        </a>
      </div>
    </div>
  );
};
