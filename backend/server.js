import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./db.js";
import userRouter from "./routes/userRoutes.js";
import recordRouter from "./routes/recordRoutes.js";



dotenv.config();
const port = process.env.PORT;


const app = express(); 
app.use(cors());
app.use(express.json());

app.use('/auth',userRouter);
app.use('/records',recordRouter);


connectDb();

app.get('/',(req,res) => {
    return res.json({msg : "sample message"})
})  




app.listen(port,(req,res) => console.log(`server is running on port ${port} !!!`))