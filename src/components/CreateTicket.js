import React, { useState, useContext } from "react";
import classes from "./CreateTicket.module.css";
import Modal from "../UI/Modal";
import { BoardContext } from "../context/board-context";

const CreateTicket = (props) => {
  const [formIsValid, setFormIsValid] = useState(true);
  const [ticket, setTicket] = useState("");
  const { columns, setColumns } = useContext(BoardContext);

  const validateInput = (data) => {
    if (data.trim() !== "" && typeof data === "string") {
      return true;
    }
  };

  const FormSubmit = (e) => {
    e.preventDefault();

    if (!validateInput(ticket)) {
      setFormIsValid(false);
      return;
    } else {
      const data = {
        id: new Date().getTime(),
        content: ticket,
      };

      Object.entries(columns).forEach(([columnId, column], index) => {
        if (column.name === "To-do") {
          setColumns({
            ...columns,
            [columnId]: {
              ...column,
              items: [...column.items, data],
            },
          });
        }
      });
      setTicket("");
      setFormIsValid(true);
      props.onClose();
    }
  };
  const form = (
    <form onSubmit={FormSubmit}>
      <div className={classes.formcontrol}>
        <div>
          <label htmlFor="ticket">New Ticket</label>
          <textarea
            type="text"
            id="ticket"
            value={ticket}
            onChange={(event) => setTicket(event.target.value)}
          ></textarea>
        </div>
      </div>
      {!formIsValid && (
        <p className={classes.errortext}>Please enter Valid data</p>
      )}
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
  return <Modal onClose={props.onClose}>{form}</Modal>;
};

export default CreateTicket;
