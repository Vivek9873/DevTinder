
const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const authRouter = express.Router();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// SignUp request
authRouter.post("/signup",async(req,res)=>{
    
    try{
        // Validation of the data 
        validateSignUpData(req);
        // Encrypt the password
        const {firstName,lastName,email,password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);



        const newUser =  await User.create({
            firstName,lastName,email,password:passwordHash
        })
        const token = jwt.sign({_id:newUser._id},JWT_SECRET_KEY,{expiresIn:"8h"});
        res.cookie("token",token);
        res.status(200).json({
            message:"New User Added  Successful!",
            data:newUser
        })
        

    }
    catch(e){
        res.status(400).json({message:"ERROR MESSAGE: "+e.message});
    }
})

// Login request
authRouter.post("/login",async(req,res)=>{
    try{
        console.log(req.body)
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            throw new Error("User doesn't exist");
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            throw new Error("Invalid Password!");
        }
        
        const token = jwt.sign({_id:user._id},JWT_SECRET_KEY,{expiresIn:"8h"});
        res.cookie("token",token);
        res.status(200).json({
            message:"Login Successful!",
            data:user
        })
        
        
        
    }
    catch(e){
        res.status(400).json({message:"ERROR MESSAGE: "+e.message});
        
    }
})

// Logout 

authRouter.post("/logout",(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())});
    res.status(200).json({
        message:"Logout Successful!",
    })
    
})

module.exports = authRouter