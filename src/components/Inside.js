import React, { useState, useEffect } from "react";
import InsideOptions from "./InsideOptions";
import "./Inside.css";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import AddEvents from "./AddEvents";
function Inside({ match }) {
  const [events, setEvents] = useState([]);
  const [event_img, setevent_img] = useState(null);
  const [count, setCount] = useState(0);
  var counts = 0;
  const Image_Ref = collection(db, "AddEvents");
  const event_Ref = collection(db, "AddEvents");
  const countRef = collection(db, "regsiterations");
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
  console.log("Event after t : ", events);

  const navigate = useNavigate();
  return (
    <>
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
              <div className="Insidebottom__Options">
                <p>Brief</p>
                <p>Timeline</p>
                <p>Details</p>
                <p>Dates and Deadlines</p>
                <p>Prizes</p>
                <p>Feedback</p>
              </div>
              <div className="Insidebottom__Timeline">
                <h3>Music Competition: Stages and Timeline</h3>
                <div className="timeline1">
                  <h4>Round 1: solo song</h4>
                  <p>
                    first round of music comp which is to be cleared to enter
                    the next round
                  </p>
                </div>
                <div className="timeline2">
                  <h4>Round 2: group song</h4>
                  <p>
                    second round of music comp which is to be cleared to enter
                    the finals
                  </p>
                </div>
                <div className="timeline3">
                  <h4>Final round</h4>
                </div>
              </div>
              <div className="Insidebottom__Details">
                <h3>All that you need to know about Music Competition</h3>
                <p>
                  <b>Event Title: </b>Music competition
                </p>
                <p>
                  <b> Event Brief Description:</b>
                  <br />• The event consists of multiple rounds,each having an
                  elimination round
                  <br />• The event consists of multiple rounds,each having an
                  elimination round
                </p>
                <p>
                  <b> PreRequisites:</b>
                  <br />• Music Knowledge
                  <br />• Instrumental knowledge
                </p>
                <p>
                  <b>Eligibility:</b>
                  <br />• Students
                  <br />• Teachers
                </p>
              </div>
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
                  <textarea rows="10" placeholder="Write a feedback" />
                </div>
              </div>
            </div>
          </div>
          <div className="Inside__left">
            <div className="Register_button">
              <h3>₹ 200</h3>
              <button type="submit" onClick={() => navigate("/registerevents")}>
                Register
              </button>
            </div>
            <hr />
            <div className="Details__left">
              <PersonAddAlt1Icon />
              <p>
                <b>
                  {count}/
                  {events &&
                    events.map((item) => {
                      console.log(item);
                      return <p>{item.no_registrations}</p>;
                    })}
                  Registered
                </b>
              </p>
              <GroupsIcon />
              <center>
                <p>
                  <b>Team size</b>
                  <br />{" "}
                  {events &&
                    events.map((item) => {
                      console.log(item);
                      return <p>{item.no_participants} Member/Members</p>;
                    })}{" "}
                </p>
              </center>
            </div>
            <hr />
            <div className="Eligibility">
              <center>
                <h3>Eligibility</h3>
              </center>
              <p>Engineering Students</p>
              <p>Teachers</p>
              <p>MBA students</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inside;
