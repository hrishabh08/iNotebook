import React, { useContext, useState } from "react";
import noteContext from "./contexts/notes/noteContext";

const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addnote } = context;

  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    props.showAlert("Note added", "success")
    setnote({
      title: "",
      description: "",
      tag: "",
    })
  };

  const handleChange = (e) => {
    //...note means default note
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  //changing state

  return (
    <div className="container my-2">
      <h2>Add a note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby=""
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            aria-describedby=""
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            aria-describedby=""
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addnote;
