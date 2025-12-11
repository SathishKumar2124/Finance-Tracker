import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import connectDb from "./db.js";

dotenv.config();

const app = express(); 
app.use(cors());
app.use(express.json());


connectDb();

app.get('/',(req,res) => {
    return res.json({msg : "sample message"})
})  

const port = process.env.PORT;


app.listen(port,(req,res) => console.log(`server is running on port ${port} !!!`))