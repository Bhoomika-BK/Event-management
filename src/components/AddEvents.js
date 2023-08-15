import React, { useState } from "react";
import "./AddEvents.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Login from "./Login";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddEvents() {
  const [{ user }, dispatch] = useStateValue();
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
  const [currentPage, setCurrentPage] = useState(1);
  const [round1T, setRound1T] = useState("");
  const [round1D, setRound1D] = useState("");
  const [round2T, setRound2T] = useState("");
  const [round2D, setRound2D] = useState("");
  const [round3T, setRound3T] = useState("");
  const [round3D, setRound3D] = useState("");
  const [pre1, setPre1] = useState("");
  const [pre2, setPre2] = useState("");

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div>
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
              </form>
            </div>

            <button onClick={nextPage}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="events__info">
              <form>
                <input
                  placeholder="Round1 Title"
                  type="text"
                  onChange={(e) => setRound1T(e.target.value)}
                  value={round1T}
                />
                <input
                  placeholder="Round1 description"
                  type="text"
                  onChange={(e) => setRound1D(e.target.value)}
                  value={round1D}
                />
                <input
                  placeholder="Round2 Title"
                  type="text"
                  onChange={(e) => setRound2T(e.target.value)}
                  value={round2T}
                />
                <input
                  placeholder="Round2 description"
                  type="text"
                  onChange={(e) => setRound2D(e.target.value)}
                  value={round2D}
                />
                <input
                  placeholder="Round3 Title"
                  type="text"
                  onChange={(e) => setRound3T(e.target.value)}
                  value={round3T}
                />
                <input
                  placeholder="Round3 description"
                  type="text"
                  onChange={(e) => setRound3D(e.target.value)}
                  value={round3D}
                />
                <input
                  placeholder="Prequisite1"
                  type="text"
                  onChange={(e) => setPre1(e.target.value)}
                  value={pre1}
                />
                <input
                  placeholder="Prequisite2"
                  type="text"
                  onChange={(e) => setPre2(e.target.value)}
                  value={pre2}
                />

                <button type="submit" onClick={submitAddEvent}>
                  Add Event
                </button>
              </form>
            </div>

            <button onClick={prevPage}>Previous</button>
            <button onClick={nextPage}>Next</button>
          </div>
        );

      default:
        return null;
    }
  };
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
      !Event_image ||
      !round1T ||
      !round1D ||
      !round2T ||
      !round2D ||
      !round3T ||
      !round3D ||
      !pre1 ||
      !pre2
    ) {
      toast.warning("Fill all fields");
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
      Event_image: Event_image,
      round1Title: round1T,
      round1Description: round1D,
      round2Title: round2T,
      round2Description: round2D,
      round3Title: round3T,
      round3Description: round3D,
      pre1: pre1,
      pre2: pre2,
    });
    toast.success("Event sucessfully added!!!", {
      autoClose: 2000,
    });
    navigate("/");
  };
  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <div className="Add__events">
          <div className="events__img">
            <img
              src="https://thumbs.dreamstime.com/b/add-event-icon-trendy-design-style-isolated-white-background-vector-simple-modern-flat-symbol-web-site-mobile-logo-135752139.jpg"
              alt=""
            />
          </div>
          {renderPage()}
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default AddEvents;
