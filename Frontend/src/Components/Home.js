import React, { useContext } from "react";
import Addnote from "./Addnote";
import noteContext from "./contexts/notes/noteContext";
import NoteData from "./NoteData";

const Home = (props) => {
  const context = useContext(noteContext);
  const { note, setnote } = context;
  return (
    <>
      <Addnote showAlert={props.showAlert} />
      <NoteData showAlert={props.showAlert} />
    </>
  );
};

export default Home;
