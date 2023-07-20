import React, { useContext, useState } from "react";
import noteContext from "./contexts/notes/noteContext";

const Noteitem = (props) => {
  const { note, update, key } = props;
  const context = useContext(noteContext);
  const { deletenote } = context;

  return (
    <div className="col-md-3" key={key}>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => {
              deletenote(note._id);
              props.showAlert("Note deleted", "success")
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={() => {
              update(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
