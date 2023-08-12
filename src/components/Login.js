import React, { useState } from "react";
import "./Login.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
function Login() {
  const mailformat =
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
  const passwordformat = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const [{ user }, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginToApp = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Fill all fields");
      return;
    } else if (!email.match(mailformat)) {
      alert("Invalid email id");
      return;
    } else if (!password.match(passwordformat)) {
      alert(
        "Password should contain atlest 8 charecters with captital letter, small letters and special charecter."
      );
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        if (auth) {
          navigate("/");
        }
        console.log(userCredentials);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const signinwithgoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then(({ userAuth }) => {
        dispatch({
          type: "SET_USER",
          user: userAuth,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="login">
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
          placeholder="Email"
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
        <button type="submit" onClick={loginToApp}>
          Sign in
        </button>
        <button type="submit" onClick={signinwithgoogle}>
          Sign in with google
        </button>
      </form>
      <Link to="/register">
        <p>
          Not a member?
          <span className="login__register">Register now</span>
        </p>
      </Link>
    </div>
  );
}

export default Login;
