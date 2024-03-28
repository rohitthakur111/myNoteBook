import express from 'express'
import notes from '../models/Notes.js';
import expressvalidator from 'express-validator'
import fetchUser from '../middlware/fetchuser.js';

const fetchuser = fetchUser;
const { body, validationResult } = expressvalidator;
const Notes = notes;    
const app = express();
const router = express.Router();
// ROUTE 1: Get a all notes using Get "/api/notes/fetchallnotes" 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const allNotes = await Notes.find({ user: req.user.id });
    res.json(allNotes);
});
// ROUTE 2 : Add a new note Using Post "/api/notes/addnote" 
router.post('/addnote', fetchuser, [
    body('title', 'Title should not be empty').exists(),
    body('description', 'Description should not be empty').exists(),
    body('description', 'Description should not be empty').isLength({ min: 10 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.staus(400).json({ errors: errors.array() })
        }
        const { title, description, tag } = req.body;
        const myNotes = new Notes({
            title, description, tag, user: req.user.id
        });
        const saveNotes = await myNotes.save();
        res.status(201).json(saveNotes);  
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3 : Update note Using PUT "/api/notes/updatenote/:id"  Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // create new note object
    let newNote = {};
    try{
        newNote.title = title ? title : '';
        newNote.description = description ? description : '';
        newNote.tag = tag ? tag : 'Genral';
        // find the note to be updated 
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(400).send("Note not found")};
        if(note.user.toString() !== req.user.id){ return res.status(401).send("Not Allowed");}
        note = await Notes.findByIdAndUpdate(req.params.id, { $set : newNote }, { new: true });
        return res.json({note});
    }catch(error){
        return res.status(500).send("Internal server error");
    }
    
});
// Route 4 : Delete user notes using DELETE "api/notes/deletenote/:id"  Login Reqiuired
 router.delete("/deletenote/:id", fetchuser, async(req,res)=>{
    try{
        // find notes to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note){ return res.status(401).send("Notes not found"); }
        //allow to user delte to delete its notes
        if(note.user.toString() !== req.user.id){ return res.status(400).send("Not Allowed")}
        note = await Notes.findByIdAndDelete(req.params.id);
        return res.status(201).json({ "Success" : "Note has been deleted", "note" : note });
    }catch(error){
        return res.status(500).send("Internal server error");
    }
 });
export default router;