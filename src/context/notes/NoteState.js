import NoteContext from './noteContext';
import React, { useState } from 'react';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    //Notes initial value 
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    //~~~~~~~~~~~~~~~~~~~~~
    // fetch all notes 
    const getNotes = async() => {
        // Api call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwNTU5YmU5Njc5NTU4MDM0Y2M2ZTk5In0sImlhdCI6MTcxMTYyNjcxM30.IZjzBSrWM8PvOztV1ujMy2PkiXdw81qJcU5eXvS9Rg8"
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    // fetch all notes end
    //~~~~~~~~~~~~~~~~~~~~~

    // ~~~~~~~~~~~~~~~~~~~~~
    // add note function 
    const addNote = async (title, description, tag) => {
        // Api call for adding new note
        const response = await fetch(`${host}/api/notes//addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwNTU5YmU5Njc5NTU4MDM0Y2M2ZTk5In0sImlhdCI6MTcxMTYyNjcxM30.IZjzBSrWM8PvOztV1ujMy2PkiXdw81qJcU5eXvS9Rg8"
            },
            body: JSON.stringify({title, description, tag}),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }
    // add note function is end here
    //~~~~~~~~~~~~~~~~~~~~~

    
    //:~~~~~~~~~~~~~~~~~~~~~
    // delete  note logic
    const deleteNote = async(id) => {
        //Api call for delete notes
        await fetch(`${host}/api/notes//deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwNTU5YmU5Njc5NTU4MDM0Y2M2ZTk5In0sImlhdCI6MTcxMTYyNjcxM30.IZjzBSrWM8PvOztV1ujMy2PkiXdw81qJcU5eXvS9Rg8"
            }
        }); 
        const newNotes = notes.filter((notes)=>{ return notes._id !== id});
        setNotes(newNotes);
    }
    // delete  note logic end here
    //~~~~~~~~~~~~~~~~~~~~~

    //~~~~~~~~~~~~~~~~~~~~~
    // edit note by id
    const editNote = async (id, title, description, tag) => {
        // Api call 
        await fetch(`${host}/api/notes//updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwNTU5YmU5Njc5NTU4MDM0Y2M2ZTk5In0sImlhdCI6MTcxMTYyNjcxM30.IZjzBSrWM8PvOztV1ujMy2PkiXdw81qJcU5eXvS9Rg8"
            },
            body: JSON.stringify({title, description, tag}),
        });
        
        // logic to edit note
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index <= newNotes.length; index++) {
            let element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    //~~~~~~~~~~~~~~~~~~~~~
    // edit note by id

return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;   