import React, { useEffect, useState } from "react";
import "./RegisterEvents.css";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
function RegisterEvents() {
  const mailformat =
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventName, setEventName] = useState("");
  const [dob, setDob] = useState("");
  const [event_list, setEventList] = useState([]);
  const navigate = useNavigate();
  const registerRef = collection(db, "regsiterations");
  const eventlistRef = collection(db, "AddEvents");
  useEffect(() => {
    const q = query(eventlistRef);
    onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setEventList(items);
    });
  }, []);
  const submitRegistration = (e) => {
    e.preventDefault();
    if (
      !id ||
      !username ||
      !userEmail ||
      !phone ||
      !eventName ||
      !dob ||
      !event_list
    ) {
      alert("Fill all fields");
      return;
    } else if (!userEmail.match(mailformat)) {
      alert("Invalid email id");
      return;
    }
    addDoc(registerRef, {
      userId: id,
      username: username,
      useremail: userEmail,
      phone: phone,
      eventname: eventName,
      dob: dob,
    });
    navigate("/");
    setId("");
    setEventName("");
    setUserEmail("");
    setUsername("");
    setDob("");
    setPhone("");
  };
  return (
    <div className="register__events">
      <form>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnmpkQOCKmVArqLgXC3o11HZIDlvRd4pjdOJX8Tc83k_4u1xQ3gXTXNAvlG5UfK9RwQ3I&usqp=CAU"
          alt=""
        />
        <input
          type="text"
          placeholder="Enter your ID"
          onChange={(e) => setId(e.target.value)}
          value={id}
        />
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
        />
        <input
          type="text"
          placeholder="phone number"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        <select
          onChange={(e) => setEventName(e.target.value)}
          value={eventName}
        >
          {event_list.map((item) => {
            return <option>{item.event_name}</option>;
          })}
        </select>
        <input
          type="text"
          placeholder="Date of Birth"
          onChange={(e) => setDob(e.target.value)}
          value={dob}
        />
        <button onClick={submitRegistration}>Register for the event</button>
      </form>
    </div>
  );
}

export default RegisterEvents;
