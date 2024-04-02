import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote.js';
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  
  //editing note
  // initials value of note 
  const [note, setNote] = useState({id:"", etitle : "", edescription : "", etag : 'Genral'});
  const ref = useRef(null);

  // value of edit note when moadl is open ::: open modal
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id : currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag });
  }
  // edit note by call context editNiote function and hide modal
  const clcikEditNote = (e) =>{
    editNote(note.id,note.etitle,note.edescription,note.etag);
    ref.current.click();
  }
  // set value of note when chage 
  const onChange= (e)=>{
    setNote({ ...note, [e.target.name]: e.target.value});

  }
 //editing note end here
  return (
    <div>
      <AddNote />
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              {/* ~~~~~~~~~~~~~~~~~~~~~ */}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" name="etitle" id="etitle" onChange={onChange} value={note.etitle} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label" >Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} minLength={5} required/>
                </div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label" >Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag}/>
                </div>
              </form>
               {/* ~~~~~~~~~~~~~~~~~~~~~ */}

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled ={ note.etitle.length<3 || note.edescription.length<5 } type="button" className="btn btn-primary" onClick={clcikEditNote}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3>Your Notes </h3>
        <div className="conatiner">
          {notes.length === 0 && ' No notes to display'}  
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}></NoteItem>
        })}
      </div>
    </div>
  )
}

export default Notes
