import NoteContext from './noteContext';
import React, { useState } from 'react';

const NoteState = (props)=>{
   const notesInitial =[
        {
        "_id": "66055a169679558034cc6e9e",
        "user": "660559be9679558034cc6e99",
        "title": "Node js course ",
        "description": "This is backend Node js Course.",
        "tag": "Node",
        "date": "2024-03-28T11:52:54.820Z",
        "__v": 0
        },
        {
        "_id": "66055a289679558034cc6ea0",
        "user": "660559be9679558034cc6e99",
        "title": "Node js course12 ",
        "description": "This is backend Node js Course12.",
        "tag": "Node12",
        "date": "2024-03-28T11:53:12.467Z",
        "__v": 0
        },
        {
        "_id": "66055a169679558034cc6e9eh",
        "user": "660559be9679558034cc6e99",
        "title": "Node js course ",
        "description": "This is backend Node js Course.",
        "tag": "Node",
        "date": "2024-03-28T11:52:54.820Z",
        "__v": 0
        },
        {
        "_id": "66055a289679558034cc6ea0f",
        "user": "660559be9679558034cc6e99",
        "title": "Node js course12 ",
        "description": "This is backend Node js Course12.",
        "tag": "Node12",
        "date": "2024-03-28T11:53:12.467Z",
        "__v": 0
        },
        {
        "_id": "66055a169679558034cc6e9ed",
        "user": "660559be9679558034cc6e99",
        "title": "Node js course ",
        "description": "This is backend Node js Course.",
        "tag": "Node",
        "date": "2024-03-28T11:52:54.820Z",
        "__v": 0
        },
        {
        "_id": "66055a289679558034cc6fdea0",
        "user": "660559be9679558034cdfc6e99",
        "title": "Node js course12 ",
        "description": "This is backend Node js Course12.",
        "tag": "Node12",
        "date": "2024-03-28T11:53:12.467Z",
        "__v": 0
        },
        {
        "_id": "66055a169679558034ccsd6e9e",
        "user": "660559be9679558034cc6e99",
        "title": "Node js course ",
        "description": "This is backend Node js Course.",
        "tag": "Node",
        "date": "2024-03-28T11:52:54.820Z",
        "__v": 0
        },
        {
        "_id": "66055a289679558034sdcc6ea0",
        "user": "660559be9679558034cc6e99",
        "title": "Node js course12 ",
        "description": "This is backend Node js Course12.",
        "tag": "Node12",
        "date": "2024-03-28T11:53:12.467Z",
        "__v": 0
        }
        
    ]
    const [notes, setNotes] = useState(notesInitial);
    // add note
    const addNote = (title, description, tag)=>{
        console.log("New note i created");
        const note = {
            "_id": "66055a289679558034sdcc6ea0",
            "user": "660559be9679558034cc6e99",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-03-28T11:53:12.467Z",
            "__v": 0
            };
            setNotes(notes.concat(note));
    }

    // delte  note by is
     const deleteNote = ()=>{
        
     }

    // edit note by id
    const editNote = ()=>{
        
    }
    return(
        <NoteContext.Provider value={{notes,addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;   