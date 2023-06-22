import React from "react";
import { useState, useEffect } from "react";
import "./styles.css";
import "./styles.scss";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import DayPicker from "react-day-picker";
import { formatDate } from "react-day-picker/moment";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState(new Date().getDay());

  let myEventsList = [
    {
      title: "leraning",
      start: new Date(2020, 10, 30),
      end: new Date(2020, 10, 30),
      allDay: false
    },
    {
      title: "Long Event",
      start: new Date(2020, 11, 1),
      end: new Date(2020, 11, 1),
      allDay: false
    }
  ];

  useEffect(() => {
    setEvents(myEventsList);
  }, []);

  const handleSelect = (eventItem) => {
    const title = window.prompt("New Event name");
    if (title) {
      let data = { title: title, start: eventItem.start, end: eventItem.end };
      setEvents((events) => [...events, data]);
    }
  };

  const handleDayClick = (day, { selected }) => {
    //{selectedDay: selected ? undefined : setSelectedDay(day)}
    setSelectedDay(formatDate(day));
    setYear(formatDate(day).split("/")[2]);
    setMonth(formatDate(day).split("/")[0]);
    setDays(formatDate(day).split("/")[1]);
    console.log(formatDate(day));
  };

  return (
    <Container fluid>
      <div className="d-flex flex-fill">
        <NavBar />
      </div>
      <div className="py-3 d-flex">
        <div className="flex-sm-column">
          <DayPicker selectedDays={selectedDay} onDayClick={handleDayClick} />
        </div>
        <div className="flex-sm-column">
          <Calendar
            selectable
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectSlot={handleSelect}
            onSelectEvent={(event) => alert(event.title)}
            defaultView={Views.WEEK}
            defaultDate={new Date(year, month, days)}
            style={{ height: 500 }}
          />
        </div>
      </div>
    </Container>
  );
}
