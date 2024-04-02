import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
const AddNote = () => {
    const context  = useContext(noteContext);
    const {addNote} = context;
    // value of note 
    const [note, setNote] = useState({title : "", description : "", tag : 'Genral'});
    const onChange= (e)=>{
        setNote({ ...note, [e.target.name]: e.target.value});
    }

    // onclick create note
    const createNote = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title : "", description : "", tag : ''});
    }
    
    
    return (
        <div>
            <h3>Add a Note </h3>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control"  name="title" id="title" onChange={onChange} minLength="5" value={note.title}required />
                </div>
                <div className="mb-3"> 
                    <label htmlFor="description" className="form-label" >Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength="5" value={note.description} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label" >Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}value={note.tag} />
                </div>
                <button disabled ={ note.title.length<3 || note.description.length<5} type="submit" className="btn btn-danger" onClick={createNote} >Add Note</button>
            </form>
        </div>
    )
}

export default AddNote;
