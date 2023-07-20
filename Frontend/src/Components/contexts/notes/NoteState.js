import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const intialnotes = [];

  const [note, setnote] = useState(intialnotes);

  //fetch all notes
  //add note
  const getnotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    const json = await response.json();
    setnote(json);
  };

  //ADD notes
  const addnote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),


    });

    const newnote = await response.json();
    setnote(note.concat(newnote));
  };

  //delete note
  const deletenote = async (id) => {
    console.log("Note deleted");
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },
    });

    const json = response.json();
    const newnote = note.filter((note) => {
      return note._id !== id;
    });
    setnote(newnote);
  };

  //edit note
  const editnote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },

      body: JSON.stringify({ title, description, tag }),
    });
    const res = response.json();

    //edit note function
    let newnote = JSON.parse(JSON.stringify(note))
    for (let index = 0; index < note.length; index++) {
      const element = newnote[index];
      if (element._id === id) {
        newnote[index].title = title;
        newnote[index].description = description;
        newnote[index].tag = tag;
        break;
      }

    }
    setnote(newnote);
  };

  return (
    <NoteContext.Provider
      value={{ note, addnote, deletenote, editnote, getnotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
