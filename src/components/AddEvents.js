import React, { useState } from "react";
import "./AddEvents.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
function AddEvents() {
  const navigate = useNavigate();
  const [event_name, setEvent_name] = useState("");
  const [event_id, setEvent_id] = useState("");
  const [location, setlocation] = useState("");
  const [event_date, setEvent_date] = useState("");
  const [no_participants, setNo_participants] = useState("");
  const [no_registrations, setNo_registartions] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [Event_image, setEvent_img] = useState("");

  const AddEventRef = collection(db, "AddEvents");
  const submitAddEvent = (e) => {
    e.preventDefault();
    if (
      !event_name ||
      !event_id ||
      !location ||
      !event_date ||
      !no_participants ||
      !no_registrations ||
      !description ||
      !price ||
      !Event_image
    ) {
      alert("Fill all fields");
      return;
    }
    addDoc(AddEventRef, {
      event_name: event_name,
      event_id: event_id,
      location: location,
      event_date: event_date,
      no_participants: no_participants,
      no_registrations: no_registrations,
      description: description,
      price: price,
      Event_image: Event_image,
    });
    navigate("/");
  };
  return (
    <div className="Add__events">
      <div className="events__img">
        <img
          src="https://thumbs.dreamstime.com/b/add-event-icon-trendy-design-style-isolated-white-background-vector-simple-modern-flat-symbol-web-site-mobile-logo-135752139.jpg"
          alt=""
        />
      </div>
      <div className="events__info">
        <form>
          <input
            placeholder="Event name "
            type="text"
            onChange={(e) => setEvent_name(e.target.value)}
            value={event_name}
          />
          <input
            placeholder="Event id "
            type="text"
            onChange={(e) => setEvent_id(e.target.value)}
            value={event_id}
          />
          <input
            placeholder="Location "
            type="text"
            onChange={(e) => setlocation(e.target.value)}
            value={location}
          />
          <input
            placeholder="Event Date "
            type="text"
            onChange={(e) => setEvent_date(e.target.value)}
            value={event_date}
          />
          {/* <input
            placeholder="Price"
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          /> */}
          <input
            placeholder="Event image url"
            type="text"
            onChange={(e) => setEvent_img(e.target.value)}
            value={Event_image}
          />
          <input
            placeholder="Team Limit"
            type="text"
            onChange={(e) => setNo_participants(e.target.value)}
            value={no_participants}
          />
          <input
            placeholder="Number of registrations"
            type="text"
            onChange={(e) => setNo_registartions(e.target.value)}
            value={no_registrations}
          />
          <textarea
            placeholder="Event Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          <button type="submit" onClick={submitAddEvent}>
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEvents;
