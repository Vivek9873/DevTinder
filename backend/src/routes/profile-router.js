const express = require("express");
const userAuth = require("../middleware/auth");
const {validateProfileEditData} = require("../utils/validation") 
const bcrypt = require("bcrypt")
const validator = require("validator")
const User = require("../models/user")

const profileRouter = express.Router();


// Getting profile of the user
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.status(200).json({
            message:"Profile Found Successfully!",
            data:user
        })
        
    }
    catch(e){
        res.status(400).json({message:"ERROR MESSAGE: "+e.message});
        
    }
})


profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    // Validate the req.body
    try{
        if(!validateProfileEditData(req)){
            throw new Error("Invalid Profile Edit!")
        }
        const updatedUser = await User.findByIdAndUpdate(req.user._id,req.body,{
            runValidators:true
        })
        res.status(200).json({
            message:`${updatedUser.firstName} your profile updated successfully!`,
            data:updatedUser,
        })
        
    }
    catch(e){
        res.status(400).json({message:"ERROR MESSAGE: "+e.message});
    }
    
})

// Editing the password 

profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    try{
        const {password} = req.body;
        if(!validator.isStrongPassword(password)){
            throw new Error("Weak Password!")
        }
        const hashPassword = await bcrypt.hash(password,10);
        
        const user = await User.findByIdAndUpdate(req.user._id,{$set:{password:hashPassword}});
        res.json({
            message:"Password updated successfully!",
            data:user,
        })
        
    }
    catch(e){
        res.status(400).json({message:"ERROR MESSAGE: "+e.message});
        
    }
    
})

module.exports = profileRouter;
