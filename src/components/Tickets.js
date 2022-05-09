import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Tickets.module.css";
import { BoardContext } from "../context/board-context";

const Tickets = () => {
  // Data about a things id, origin, and destination
  const [dragData, setDragData] = useState({});
  // Are we hovering over the noDrop div?
  const [isDragable, setIsDrogable] = useState(false);
  const { columns, setColumns } = useContext(BoardContext);

  //onDragStart - triggered when the user starts to drag a list item.
  const handleDragStart = (e, index, columnId, column) => {
    console.log("handleDragStart", index, columnId, column);

    setDragData({
      selectedColumnId: columnId,
      selectedItemId: index,
      selectedColumn: { ...column },
    });
  };

  //onDragEnter – triggered when a draggable element enters a valid drop target.
  const handleDragEnter = (e, index) => {
    console.log("handleDragEnter", e, index);
    setIsDrogable(true);
    const { selectedColumnId, selectedItemId, selectedColumn } = dragData;

    const newList = [...selectedColumn.items];
    const item = newList[selectedItemId];
    newList.splice(selectedItemId, 1);
    newList.splice(index, 0, item);

    setColumns({
      ...columns,
      [selectedColumnId]: {
        ...selectedColumn,
        items: newList,
      },
    });
  };

  //onDragLeave – triggered when a draggable element leaves a valid drop target.
  const handleDragLeave = (e) => {
    console.log("handleDragLeave", e);
  };

  //onDrop – triggered when a draggable element is dropped on a valid drop target.
  const handleDrop = (e, columnId, column, index) => {
    console.log("handleDrop", e, columnId, column, index);
    if (!columnId) return;
    const { selectedColumnId, selectedItemId, selectedColumn } = dragData;

    if (selectedColumnId !== columnId) {
      const sourceItems = [...selectedColumn.items];
      const destItems = [...column.items];
      const [removed] = sourceItems.splice(selectedItemId, 1);
      destItems.splice(index, 0, removed);

      setColumns({
        ...columns,
        [selectedColumnId]: {
          ...selectedColumn,
          items: sourceItems,
        },
        [columnId]: {
          ...column,
          items: destItems,
        },
      });
    }

    setIsDrogable(false);
  };

  return Object.entries(columns).map(([columnId, column], index) => {
    return (
      <article className={classes.columns} key={columnId}>
        <h2>{column.name}</h2>
        <div style={{ margin: 8 }}>
          <section
            key={columnId}
            style={{ background: isDragable ? "lightblue" : "lightgrey" }}
            className={classes.column}
            // onDragOver – prevents ghosting when the list item is dropped.
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, columnId, column, index)}
          >
            {column.items.map((item, index) => {
              return (
                <Link to={`/board/${item.id}`} key={index}>
                  <section
                    key={index}
                    className={classes.items}
                    style={{
                      backgroundColor: isDragable ? "#263B4A" : "#456C86",
                    }}
                    // MAKES THE ITEM DRAGGABLE!!!!
                    //sets the list item draggle property to true.
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, index, columnId, column)
                    }
                    onDragEnter={(e) => handleDragEnter(e, index)}
                  >
                    {item.content}
                  </section>
                </Link>
              );
            })}
          </section>
        </div>
      </article>
    );
  });
};

export default Tickets;
