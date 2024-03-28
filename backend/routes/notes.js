import express from 'express'
import notes from '../models/Notes.js';
import expressvalidator from 'express-validator'
import fetchUser from '../middlware/fetchuser.js';
import notesModel from '../models/Notes.js';
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
export default router;