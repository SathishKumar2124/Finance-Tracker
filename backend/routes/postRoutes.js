import express from "express";
import validateToken from "../middlewares/AuthMiddleware.js";

const postRouter = express.Router();

postRouter.get('/',validateToken,(req,res)=> {
    res.status(200).json([
        {
            id : 1,
            title : "post 1"
        },
         {
            id : 2,
            title : "post 2"
        },
         {
            id : 3,
            title : "post 3"
        },
         {
            id : 4,
            title : "post 4"
        },
    ])
})



export default postRouter;