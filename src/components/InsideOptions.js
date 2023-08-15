import React from "react";
import "./InsideOptions.css";
function InsideOptions({ event_name, Event__image, description }) {
  return (
    <div className="InsideOptions" id="InsideOptions">
      <img src={Event__image} alt="" />
      <div className="InsideOptions__info">
        <h4>{event_name}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default InsideOptions;
