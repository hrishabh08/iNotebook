import { Modal } from "bootstrap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "./contexts/notes/noteContext";
import Noteitem from "./Noteitem";


function NoteData(props) {

  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { note, getnotes, editnote } = context;
  const [Enote, Esetnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getnotes();
    }
    else {
      navigate('/login');
    }

  }, []);

  //modal components
  const modalRef = useRef();

  const showModal = () => {
    const modalEle = modalRef.current;
    const bsModal = new bootstrap.Modal(modalEle, {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };

  const hideModal = () => {
    const modalEle = modalRef.current;
    const bsModal = bootstrap.Modal.getInstance(modalEle);
    bsModal.hide();
  };


  //NOTE UPDATE FUNCTIONS
  const update = (currentNote) => {
    showModal();
    Esetnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

  };
  const handleClick = (e) => {
    e.preventDefault();

    editnote(Enote.id, Enote.etitle, Enote.edescription, Enote.etag);
    hideModal();
    props.showAlert("Note Updated", "success")
  };
  const handleChange = (e) => {
    Esetnote({ ...Enote, [e.target.name]: e.target.value });
  };


  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={showModal}
        hidden
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={hideModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  aria-describedby=""
                  value={Enote.etitle}
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
                  id="edescription"
                  name="edescription"
                  aria-describedby=""
                  value={Enote.edescription}
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
                  id="etag"
                  name="etag"
                  aria-describedby=""
                  value={Enote.etag}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={hideModal}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-4">
        <h2 >Your notes </h2>
        <h4 className="mx-1">{note.length === 0 ? 'No note to print' : ''}</h4>
        {note.length !== 0 && note.map((note1) => {
          return <Noteitem key={note._id} update={update} note={note1} showAlert={props.showAlert} />;
        })}
      </div>
    </div>
  );
}

export default NoteData;
