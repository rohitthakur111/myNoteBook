import React, { useContext }from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'
import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {
    const {note, updateNote} = props;
    const context = useContext(noteContext);
    const { deleteNote, editNote } = context;
   
    // const deleteNotes = ()=>{
    //   props.showAlert("Your note is deleted");
    //   console.log('deleteing note');
    // }
  return (
    <div className="col-md-3">
        <div className="card my-3">
            <div className="card-body">
              <div className ="d-flex align-items-center">
                  <h5 className="card-title">{note.title}</h5>
                  <i className="fa fa-trash-o mx-2" onClick={()=>{ deleteNote(note._id)}} ></i>
                  <i className="fa fa-edit mx-2" onClick={()=>{updateNote (note)}}></i>
              </div>
                <p className="card-text">{note.description} </p> 
            </div>
            </div>
    </div>
  )
}

export default NoteItem;
