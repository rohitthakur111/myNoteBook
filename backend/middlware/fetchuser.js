import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwtToken = jsonwebtoken;
const fetchUser = (req, res, next) =>{
    // get the user from jwt token and id to req object
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error : "Please authenticate using a valid token"});
    }
    try{
        const data = jwtToken.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }catch(error){
        return res.status(401).send({error : "Please authenticate using a valid token"})
    }
  
}
export default fetchUser;