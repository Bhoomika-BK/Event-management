import React, { useState } from "react";
import "./Header.css";
import HeaderOptions from "./HeaderOptions";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LogoutIcon from "@mui/icons-material/Logout";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import InfoIcon from "@mui/icons-material/Info";
import AddCardIcon from "@mui/icons-material/AddCard";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
function Header() {
  const [selected, setSelected] = useState(null);
  const Header_select = (itemId) => {
    setSelected(itemId);
  };
  const navigate = useNavigate();
  const logout = () => {
    console.log("logout clicked");
    auth
      .signOut()
      .then(() => {
        navigate("/Login");
      })
      .catch((err) => {
        console.log(err.msg);
      });
  };
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="header">
      <div className="header_left">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnmpkQOCKmVArqLgXC3o11HZIDlvRd4pjdOJX8Tc83k_4u1xQ3gXTXNAvlG5UfK9RwQ3I&usqp=CAU"
          alt=""
        />
      </div>
      <div className="header_right">
        <HeaderOptions
          itemId={1}
          Icon={HomeIcon}
          name="Home"
          active={selected === 1}
          onItemClicked={Header_select}
          link="/"
        />
        <HeaderOptions
          itemId={2}
          Icon={AddCardIcon}
          name="Add Event"
          active={selected === 2}
          onItemClicked={Header_select}
          link="/addevents"
        />
        <HeaderOptions
          itemId={3}
          Icon={AppRegistrationIcon}
          name="Register"
          active={selected === 3}
          onItemClicked={Header_select}
          link="/register"
        />
        <HeaderOptions
          itemId={4}
          Icon={InfoIcon}
          name="Event Info"
          active={selected === 4}
          onItemClicked={Header_select}
          link="/inside"
        />

        <HeaderOptions
          itemId={5}
          Icon={NewspaperIcon}
          name="Advertisements"
          active={selected === 5}
          onItemClicked={Header_select}
          link="/ads"
        />
        <HeaderOptions
          itemId={6}
          Icon={LoginIcon}
          name={!user ? "login" : user?.email}
          active={selected === 6}
          onItemClicked={Header_select}
          link="/login"
        />
        <div
          onClick={logout}
          className="logout"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <LogoutIcon />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
