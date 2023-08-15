import React, { useState } from "react";
import "./Footer.css";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Footer() {
  const [{ user }, dispatch] = useStateValue();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const queryRef = collection(db, "Queries");

  const submitQuery = async (e) => {
    e.preventDefault();
    if (user?.email) {
      await addDoc(queryRef, {
        query: query,
        email: user.email,
      });
      toast.success("Query submitted successfully", {
        autoClose: 2000,
      });
      setQuery("");
    } else {
      toast.warning("Login to clarify your queries!!!!", {
        autoClose: 2000,
      });
      navigate("/login");
      return;
    }
  };

  return (
    <div className="footer">
      <div className="footer__left">
        <div className="left__up">
          <img
            src="https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/svg/unstop-logo-white.svg"
            alt=""
          />
          <h2>Stay Connected</h2>
          <div className="media">
            <MailIcon />
            <p>eventManagement@gmail.com</p>
          </div>
          <div className="media">
            <CallIcon />
            <p>+91 7689674511</p>
          </div>
          <div className="other__media">
            <InstagramIcon />
            <WhatsAppIcon />
            <LinkedInIcon />
            <FacebookIcon />
            <TwitterIcon />
          </div>
        </div>
        <div className="left__bottom">
          <h2>Any Quiries</h2>
          <div className="query">
            <input
              type="text"
              placeholder="Enter your query"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <SendIcon onClick={submitQuery} />
          </div>
          <p>
            Copyright © 2023 FLIVE Consulting Pvt Ltd - All rights reserved.
          </p>
        </div>
      </div>
      <div className="footer__right">
        <div className="right__left">
          <h3>Participate</h3>
          <p>Quizzes</p>
          <p>Hackathons</p>
          <p>Workshops and Webinars</p>
          <p>Conferences</p>
          <p>Cultural events</p>
          <p>college Fests</p>
        </div>
        <div className="right__middle">
          <h3>Participate</h3>
          <p>Quizzes</p>
          <p>Hackathons</p>
          <p>Workshops and Webinars</p>
          <p>Conferences</p>
          <p>Cultural events</p>
          <p>college Fests</p>
        </div>
        <div className="right__right">
          <h3>Participate</h3>
          <p>Quizzes</p>
          <p>Hackathons</p>
          <p>Workshops and Webinars</p>
          <p>Conferences</p>
          <p>Cultural events</p>
          <p>college Fests</p>
        </div>
        <div className="right__left">
          <h3>Participate</h3>
          <p>Quizzes</p>
          <p>Hackathons</p>
          <p>Workshops and Webinars</p>

          <p>college Fests</p>
        </div>
        <div className="right__middle">
          <h3>Participate</h3>
          <p>Quizzes</p>
          <p>Hackathons</p>
          <p>Workshops and Webinars</p>
          <p>Conferences</p>
        </div>
        <div className="right__right">
          <h3>Participate</h3>
          <p>Quizzes</p>
          <p>Hackathons</p>
          <p>Workshops and Webinars</p>
          <p>Conferences</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Footer;
