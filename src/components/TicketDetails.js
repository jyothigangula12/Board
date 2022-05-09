import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./TicketDetails.module.css";
const TicketDeatails = () => {
  const [columns, setColumns] = useState([]);
  const params = useParams();
  let filterdTicket = "";
  useEffect(() => {
    const items = JSON.parse(window.localStorage.getItem("columns"));
    if (Object.entries(items).length !== 0) {
      setColumns(items);
    }
  }, []);
  Object.entries(columns).forEach(([columnId, column], index) => {
    column.items.map((ticket) => {
      if (ticket.id === Number(params.ticketId)) {
        filterdTicket = { content: ticket.content, name: column.name };
        return filterdTicket;
      }
    });
    if (filterdTicket.length > 0) return;
  });

  return (
    <figure className={classes.ticket}>
      <p>{filterdTicket.content}</p>
      <figcaption>{filterdTicket.name}</figcaption>
    </figure>
  );
};

export default TicketDeatails;
