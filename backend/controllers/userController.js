import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const signup = async(req,res) => {
    try {
        const {email,password} = req.body;
        const isUserExists = await userModel.findOne({email});

        if(isUserExists){
            return res.status(401).json({msg : "email already exist , try another one... " , success : false});
        }

        const hashedPassword = await bcrypt.hash(password,10);


        const newUser = new userModel({
            email ,
            password : hashedPassword
        })

        await newUser.save();

        res.status(201).json({msg : "user created succesfully" , success : true});

    } catch (error) {
        res.status(500).json({msg : error.message, success : false})
    }
}


const login = async(req,res) => {
    try {
        const {email,password} = req.body;
        const isUserExists = await userModel.findOne({email});

        if(!isUserExists){
            return res.status(404).json({msg : "user email not found !!!" , success : false});
        }

        const isPasswordEqual = await bcrypt.compare(password,isUserExists.password);

        if(!isPasswordEqual){
            return res.status(403).json({msg : "password is incorrect !!!" , success : false});
        }



        const jwtToken = jwt.sign({email : isUserExists.email , _id : isUserExists._id}, process.env.secret_key,{expiresIn : '24h'});

        const id = isUserExists._id;

        res.status(200).json({
            msg : "login success",
            success : true,
            jwtToken,
            email,
            id
        })

    } catch (error) {
        res.status(500).json({msg : error.message, success : false})
    }
}


export {
    signup,
    login
};