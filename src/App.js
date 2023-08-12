import React from "react";
import Header from "./Header";
import Home from "./components/Home";
import RegisterEvents from "./components/RegisterEvents";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inside from "./components/Inside";
import Login from "./components/Login";
import Register from "./components/Register";
import AddEvents from "./components/AddEvents";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Ads from "./components/Ads";
function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("User 🧑‍💻: " + authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="app">
        <Header />

        <>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/addevents" element={<AddEvents />} />
            <Route exact path="/registerevents" element={<RegisterEvents />} />
            <Route exact path="/ads" element={<Ads />} />
            <Route exact path="/inside" element={<Inside />} />
          </Routes>
        </>
      </div>
    </Router>
  );
}

export default App;
