import express from 'express';
import User from '../models/Users.js';
import expressvalidator from 'express-validator';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
import fetchUser from '../middlware/fetchuser.js';
const fetchuser = fetchUser;
const jwtToken  = jsonwebtoken;
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const { body, validationResult } = expressvalidator;
const bcript = bcrypt;
const app = express();
const router = express.Router();

// ROUTE 1: Create a user using Post "/api/auth/createuser" Creating User. || No login required 
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
            const salt = await bcript.genSalt(10);
            const secPass = await bcript.hash(req.body.password, salt);
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
        return res.status(500).send("Internal Server Error");
    }
 
});

// // ROUTE 2: Authenticate user  using Post "/api/auth/login" Login User. || No login require
router.post('/login', [
    body('email', 'Enter a valid email address').isEmail(),
    body('password', 'Password cannot be blanked').exists(),
], async (req,res)=>{
    try{
        // if user have a account 
        const validEmail = validationResult(req);
        if(!validEmail.isEmpty()){
            return res.status(200).json({ error : validEmail.array()});
        }
        const { email, password } = req.body;
        const isUser = await User.findOne({ email : email });
        if(!isUser){ 
            console.log('User have no  account on this email address : ' + email );
            return res.status(400).json({ error  : 'Login with correct email and password '});
        }
        const passwordCompare = await bcript.compare(password , isUser.password);
        if(!passwordCompare){
            return res.status(400).json({ error  : 'Login with correct email and password '});
        }
        const payLoad = {
            user : {
                id : isUser.id
            }
        }
        const loginToken = jwtToken.sign(payLoad, JWT_SECRET);
        return res.json(loginToken);
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});
// ROUTE 3: Get Loginin Detail Using : POST "/api/auth/getuser/"  -: User Login Required 
router.post('/getuser' ,fetchuser, async(req,res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).send({ error: "User not found" });
        }
        res.send(user);
    }catch(error){
        console.log(error);
        return res.status(500).send("Internal Server Error" + error);
    }   
});

//exports router
export default router;
