import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MainBoard from "./components/MainBoard";
import TicketDetails from "./components/TicketDetails";
import { BoardContext } from "./context/board-context";
const App = () => {
  //creating state to set the context value
  const [columns, setColumns] = useState([]);

  return (
    <main>
      <BoardContext.Provider value={{ columns, setColumns }}>
        <Routes>
          <Route path="/" element={<Navigate to="/board" />} />
          <Route path="/board" element={<MainBoard />} />
          <Route path="/board/:ticketId" element={<TicketDetails />} />
        </Routes>
      </BoardContext.Provider>
    </main>
  );
};

export default App;
