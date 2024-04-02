// const connectToMongo = require('./db');
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';
import authRouter from './routes/auth.js';
import notesRouter from './routes/notes.js';
import  connectToMongo  from './db.js';
connectToMongo(); 

const app = express()
const port = 5000;
app.use(cors());
app.use(express.json());
// Availble Routes
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);
app.get('/hello', (req, res) => {
  res.send('Hello Rohit Thakur Whre Are u!')
})

app.listen(port, () => {
  console.log(`myNotebook backend  app listening on port ${port}`)
})
