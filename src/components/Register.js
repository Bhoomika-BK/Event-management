import React, { useState } from "react";
import "./Register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
function Register() {
  const mailformat =
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
  const passwordformat = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [name, setName] = useState("");
  const [sid, setSid] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const userRef = collection(db, "userDetails");
  const register = (e) => {
    e.preventDefault();
    if (!name || !email || !phoneno || !password || !repassword) {
      alert("Fill all fields");
      return;
    } else if (!email.match(mailformat)) {
      alert("Invalid email id");
      return;
    } else if (phoneno < 6000000000 || phoneno > 9999999999) {
      alert("Invalid Phone number");
      return;
    } else if (!password.match(passwordformat)) {
      alert(
        "Password should contain atlest 8 charecters with captital letter, small letters and special charecter."
      );
      return;
    } else if (password !== repassword) {
      alert("Password is not matching");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        if (auth) {
          navigate("/");
          addDoc(userRef, {
            username: name,
            userid: sid,
            phoneno: phoneno,
            dob: dob,
            address: address,
            email: email,
            password: password,
          });
        }
        console.log(userCredentials);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="Register">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnmpkQOCKmVArqLgXC3o11HZIDlvRd4pjdOJX8Tc83k_4u1xQ3gXTXNAvlG5UfK9RwQ3I&usqp=CAU"
        alt=""
      />
      <form>
        <input
          placeholder="Full name "
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          placeholder="Student id "
          type="text"
          onChange={(e) => setSid(e.target.value)}
          value={sid}
        />
        <input
          placeholder="phone number "
          type="text"
          onChange={(e) => setPhoneno(e.target.value)}
          value={phoneno}
        />
        <input
          placeholder="Date of Birth "
          type="text"
          onChange={(e) => setDob(e.target.value)}
          value={dob}
        />
        <textarea
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        ></textarea>
        <input
          placeholder="Eamil"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          placeholder="Re-Enter Password"
          type="password"
          onChange={(e) => setRePassword(e.target.value)}
          value={repassword}
        />
        <button type="submit" onClick={register}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
