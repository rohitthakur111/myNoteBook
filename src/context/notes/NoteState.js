import NoteContext from './noteContext';
import React, { useState } from 'react';
const NoteState = (props) => {
    const host = "http://localhost:5000";
    //Notes initial value 
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    
    //~~~~~~~~~~~~~~~~~~~~~
    // fetch all notes of 
    const getNotes = async() => {
    const authToken = localStorage.getItem('authToken');
        // Api call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token" : authToken
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
        const authToken = localStorage.getItem('authToken');
        // Api call for adding new note
        const response = await fetch(`${host}/api/notes//addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token" : authToken
            },
            body: JSON.stringify({title, description, tag}),
        });
        const note = await response.json();
       if(note.success){
        setNotes(notes.concat(note.saveNotes));
        props.showAlert('success', "Your note is successfully added");
       }
    }
    // add note function is end here
    //~~~~~~~~~~~~~~~~~~~~~

    
    //:~~~~~~~~~~~~~~~~~~~~~
    // delete  note logic
    const deleteNote = async(id) => {
        const authToken = localStorage.getItem('authToken');
        //Api call for delete notes
        const response = await fetch(`${host}/api/notes//deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token" : authToken    
            }
        }); 
        const json = await response.json();
        if(json.success){
            const newNotes = notes.filter((notes)=>{ return notes._id !== id});
            setNotes(newNotes);
            props.showAlert('success', "Your note is deleted successfully");
        }else{
            props.showAlert('warning', "Your note is not deleted"); 
        }
    }
    // delete  note logic end here
    //~~~~~~~~~~~~~~~~~~~~~

    //~~~~~~~~~~~~~~~~~~~~~
    // edit note by id
    const editNote = async (id, title, description, tag) => {
        const authToken = localStorage.getItem('authToken');
        // Api call 
        const response = await fetch(`${host}/api/notes//updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token" : authToken
            },
            body: JSON.stringify({title, description, tag}),
        });
        const json = await response.json();
        // logic to edit note
        
        if(json.success){
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
            props.showAlert('success', "Your note is successfully Updated");
        }else{
            props.showAlert('warning', "Your note is Updated"); 
        }
    }
    // edit note by id
    //~~~~~~~~~~~~~~~~~~~~~

return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;   