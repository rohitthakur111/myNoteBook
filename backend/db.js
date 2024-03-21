import express from 'express'
import mongoose from 'mongoose'
import dotnev from 'dotenv'
const app = express();
dotnev.config();
const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;
const connectToMongo =  async () =>{
    try{   
        mongoose.connect(MONGO_URL);
        console.log('database is conneted');
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch(error){
        console.log('Error connecting to database:',error);
    }
}
export default connectToMongo;