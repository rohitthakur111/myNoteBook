import express from 'express'
import User from '../models/Users.js'
import expressvalidator from 'express-validator';
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'
const jwtToken  = jsonwebtoken;
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const { body, validationResult } = expressvalidator;
const bcript = bcrypt;
const app = express();
const router = express.Router();

// Create a user using Post "/api/auth/createuser" Creating User. || No login required 
router.post('/createuser',[
    body('name' , 'Enter a valid name').isLength({min : 3}),
    body('email', 'enter a valid name').isEmail(),
    body('password', 'Your password must be 5 character long').isLength({ min : 5 }),
], async (req, res)=>{
    // if there are errors return error and bad request 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors : errors.array() });
        }

        // Check weather user is exists with this email already 
        try{
            let user = await User.findOne({email : req.body.email})
            if(user){
                return res.status(400).json({ error : 'user is already registered with that account' })
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name : req.body.name,
                email : req.body.email, 
                password : secPass
            });
            const data = {
                user :{
                    id : user.id
                }
            }
            const authToken = jwtToken.sign(data, JWT_SECRET );
            // res.status(201).json({ user });  
            res.status(201).json(authToken);
        }
        catch(err){
            console.log(err);
            res.status(200).json({ error : 'This email is already registered', message : err.message});
        }
        
    }catch(error){
        console.log(error);
        res.status(500).json({ error: error.message });
    }
 
});
export default router;
