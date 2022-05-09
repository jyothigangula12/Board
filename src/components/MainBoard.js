import React, { useState, useEffect, useContext } from "react";
import classes from "./MainBoard.module.css";
import CreateTicket from "./CreateTicket";
import Tickets from "./Tickets";
import { BoardContext } from "../context/board-context";
function MainBoard() {
  const { columns, setColumns } = useContext(BoardContext);
  const [open, setOpen] = useState(false);
  const [columnsFromBackend, setColumnsFromBackend] = useState({});

  const getFetchUsers = () => {
    fetch("http://localhost:3000/tickets")
      .then((res) => res.json())
      .then((result) => setColumnsFromBackend(result))
      .catch(console.log);
  };
  // get tickets from json server
  useEffect(() => {
    getFetchUsers();
  }, []);

  //get the state from localStorage or from json server
  useEffect(() => {
    const items = JSON.parse(window.localStorage.getItem("columns"));

    if (items && Object.entries(items).length !== 0) {
      setColumns(items);
    } else {
      if (columnsFromBackend && columnsFromBackend.length > 0)
        setColumns(columnsFromBackend[0]);
    }
  }, [columnsFromBackend]);

  //set the local storage with modified tickets
  useEffect(() => {
    if (Object.entries(columns).length !== 0) {
      window.localStorage.setItem("columns", JSON.stringify(columns));
    }
  }, [columns]);

  //to open or close the modal to create tickets
  const showCreateHandler = () => {
    setOpen(true);
  };
  const hideCreateHandler = () => {
    setOpen(false);
  };

  return (
    <div className={classes.display}>
      {" "}
      <section>
        <button
          className={classes.button}
          type="button"
          onClick={showCreateHandler}
        >
          Create Ticket
        </button>
      </section>
      {open && <CreateTicket onClose={hideCreateHandler} />}
      <section className={classes.columns}>
        <Tickets />
      </section>
    </div>
  );
}

export default MainBoard;
