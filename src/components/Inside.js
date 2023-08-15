import React, { useState, useEffect } from "react";
import InsideOptions from "./InsideOptions";
import "./Inside.css";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import AddEvents from "./AddEvents";
import { useStateValue } from "../StateProvider";
import Login from "./Login";
function Inside() {
  const [{ user }, dispatch] = useStateValue();
  const [events, setEvents] = useState([]);
  const [event_img, setevent_img] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [count, setCount] = useState(200);
  var counts = 0;
  const Image_Ref = collection(db, "AddEvents");
  const event_Ref = collection(db, "AddEvents");
  const countRef = collection(db, "regsiterations");
  const feedbackRef = collection(db, "Feedbacks");
  useEffect(() => {
    const t = sessionStorage.getItem("EventTitle");
    console.log("Clciked is : ", t);
    const q = query(event_Ref, where("event_name", "==", t));
    const q2 = query(Image_Ref);
    const q3 = query(countRef);
    onSnapshot(q, (snaphot) => {
      snaphot.forEach((doc) => {
        if (doc.data().event_name === t) {
          setevent_img(doc.data().Event_image);
        }
      });
    });
    onSnapshot(q3, (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().eventname.toLowerCase() === t.toLowerCase()) {
          setCount(counts++);
        }
      });
    });

    const Event = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setEvents(items);
    });
    return () => {
      Event();
    };

    //eslint-disable-next-line
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const t = sessionStorage.getItem("EventTitle");
    await addDoc(feedbackRef, {
      response: feedback,
      eventname: t,
      userMail: user.email,
    });
    toast.success("Feedback submitted", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
    });
    setFeedback("");
  };
  console.log("Event after t : ", events);

  const navigate = useNavigate();
  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <div className="Inside" id="Inside">
          <div className="Inside__img">
            <img src={event_img} alt="" />
          </div>
          <div className="Inside__display">
            <div className="Inside__info">
              <div className="Inside__top">
                {events &&
                  events.map((item) => {
                    console.log(item);
                    return (
                      <InsideOptions
                        key={item.index}
                        event_name={item.event_name}
                        description={item.description}
                        Event__image={item.Event_image}
                      />
                    );
                  })}
              </div>
              <div className="Inside__bottom">
                {events &&
                  events.map((item) => {
                    return (
                      <>
                        <div className="Insidebottom__Timeline">
                          <h3>{item.event_name}</h3>
                          <div className="timeline1">
                            <h4>Round 1: {item.round1Title}</h4>
                            <p>{item.round1Description}</p>
                          </div>
                          <div className="timeline2">
                            <h4>Round 2:{item.round2Title}</h4>
                            <p>{item.round2Description}</p>
                          </div>
                          <div className="timeline3">
                            <h4>Final round: {item.round3Title}</h4>
                            <p>{item.round3Description}</p>
                          </div>
                        </div>
                        <div className="Insidebottom__Details">
                          <h3>
                            All that you need to know about {item.event_name}
                          </h3>
                          <p>
                            <b>Event Title: {item.event_name}</b>
                          </p>

                          <p className="pre__req">
                            <b> PreRequisites:</b>
                            <li>{item.pre1}</li>
                            <li>{item.pre2}</li>
                          </p>
                          <p className="pre__req">
                            <b>Eligibility:</b>
                            <li>Students</li>
                            <li>Teachers</li>
                          </p>
                        </div>
                      </>
                    );
                  })}
                <div className="Insidebottom__Dates">
                  <CalendarMonthIcon />
                  <p>
                    Registartion Deadline
                    <br />
                    {events &&
                      events.map((item) => {
                        console.log(item);
                        return <p>{item.event_date}</p>;
                      })}
                  </p>
                </div>
                <div className="Insidebottom__Prizes">
                  <h3>Rewards and Prizes</h3>
                  <div className="prizes">
                    <div className="prize1">
                      <div className="prize1__info">
                        <EmojiEventsIcon />
                        <h4>Winner</h4>
                      </div>

                      <h2>₹ 5,000</h2>
                    </div>
                    <div className="prize2">
                      <div className="prize2__info">
                        <EmojiEventsIcon />
                        <h4>Runner up</h4>
                      </div>

                      <h2>₹ 3,000</h2>
                    </div>
                    <div className="prize3">
                      <WorkspacePremiumIcon />
                      <h4>Participation Certificate</h4>
                    </div>
                  </div>
                </div>
                <div className="Insidebottom__feedback">
                  <h4>Voice your opinion by leaving a feedback</h4>
                  <div className="feedback">
                    <textarea
                      rows="8"
                      placeholder="Write a feedback"
                      onChange={(e) => setFeedback(e.target.value)}
                      value={feedback}
                    />
                    <button onClick={handleSubmit}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="Inside__left">
              {events &&
                events.map((item) => {
                  return (
                    <>
                      <div className="Register_button">
                        <h3>₹ 200</h3>
                        {count >= item.no_registrations ? (
                          <button>Registartion Closed</button>
                        ) : (
                          <button
                            type="submit"
                            onClick={() => navigate("/registerevents")}
                          >
                            Register
                          </button>
                        )}
                      </div>
                      <hr />
                      <div className="Details__left">
                        <div className="options">
                          <HowToRegIcon />
                          <div className="head__desc">
                            <p>Regsitered</p>
                            <h4>
                              {count}/{item.no_registrations}
                            </h4>
                          </div>
                        </div>
                        <div className="options">
                          <GroupsIcon />
                          <div className="head__desc">
                            <p>Team Size</p>
                            <h4>{item.no_participants}</h4>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>

          <div className="Eligibility">
            <center>
              <h3>Eligibility</h3>
              <p>Engineering Students | Teachers | MBA students</p>
            </center>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default Inside;
