import React, { useEffect, useState } from "react";
import "./Home.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Events from "./Events";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import HomeDesc from "./HomeDesc";
import Footer from "./Footer";
import { Button } from "@mui/material";
import { db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const event_Ref = collection(db, "AddEvents");
  useEffect(() => {
    const q = query(event_Ref);
    onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setEvents(items);
    });
    console.log("events : ", events);
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <div id="home">
        <div id="about__carousel">
          <Carousel
            autoPlay
            infinteLoop
            showStatus={false}
            showIndicators={true}
            showThumbs={false}
            interval={3000}
          >
            <div>
              <img
                id="home__image"
                loading="lazy"
                src="https://tse2.mm.bing.net/th?id=OIP.c-qun0T4XzvfL8BPs3NwDQHaCS&pid=Api&P=0&h=180"
                alt=""
              />
            </div>
            <div>
              <img
                id="home__image"
                loading="lazy"
                src="https://tse1.mm.bing.net/th?id=OIP.ZxmQVtiXZoj2RTRXiNYcjAHaET&pid=Api&P=0&h=180"
                alt=""
              />
            </div>
            <div>
              <img
                id="home__image"
                loading="lazy"
                src="https://tse2.mm.bing.net/th?id=OIP.Hrek8b2pq5yCjqPLAzaFvQHaEA&pid=Api&P=0&h=180"
                alt=""
              />
            </div>
            <div>
              <img
                id="home__image"
                loading="lazy"
                src="https://tse4.mm.bing.net/th?id=OIP.rqzfLXXfCpNcJT--Wrz0uQHaDt&pid=Api&P=0&h=180"
                alt=""
              />
            </div>
          </Carousel>
        </div>
        <HomeDesc />
        <div className="display__events">
          {events.map((item) => {
            return (
              <Events
                key={JSON.stringify(item)}
                image={item.Event_image}
                name={item.event_name}
                no_participants={item.no_participants}
                desc={item.description}
                location={item.location}
                Icon={PersonAddAlt1Icon}
                count={item.no_registrations}
                price={item.price}
                date={item.event_date}
              />
            );
          })}
        </div>
        <div className="Add__event">
          <button onClick={() => navigate("/addevents")}>Add An Event</button>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Home;
