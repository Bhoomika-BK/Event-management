import React from "react";
import "./Events.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
function Events({
  image,
  name,
  desc,
  location,
  no_participants,
  count,
  date,
  price,
  Icon,
}) {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    sessionStorage.setItem("EventTitle", `${name}`);
    navigate("/inside");
  };
  return (
    <div className="events">
      <div className="events__top">
        <img src={image} alt="" />
      </div>
      <div className="events__bottom">
        <div className="bottom__up">
          <div className="about__event">
            <h3 onClick={handleSubmit}>{name}</h3>

            <h3 className="participantno"> Team limit: {no_participants}</h3>
          </div>
          <div className="eventdesc">
            <p>{desc}</p>
          </div>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "10px",
            }}
          >
            <LocationOnIcon />
            {location}
          </p>
        </div>
        <div className="bottom__down">
          <div className="down__left">
            <Icon />
            <p>{count} Regsisterations</p>
          </div>
          {/* <div className="down__center">
            <p>₹ {price}</p>
          </div> */}
          <div className="down__right">
            <p>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
