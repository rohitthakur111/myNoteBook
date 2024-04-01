import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote.js';
const Notes = (props) => {
    const context  = useContext(noteContext);
    const {notes, addNote} = context;
  return (
    <div>
      <AddNote />
        <div className="row my-3">
            {notes.map((note)=>{
                return <NoteItem key={note._id} note={note} showAlert={props.showAlert}></NoteItem>
            })}
        </div>
    </div>
  )                                                                                         
}

export default Notes
