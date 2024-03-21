import express from 'express'
import users from '../models/Users.js'
const app = express();
const router = express.Router();
const UserModel = users;
// Create a user using Post "/api/auth/"
router.post('/', (req, res)=>{
    res.send(req.body);
    const User = UserModel(req.body);
    User.save();
    console.log(req.body);
})
export default router;