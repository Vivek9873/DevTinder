const express = require("express");
const userAuth = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params?.toUserId;
        const status = req.params?.status;

        // Fourth both user id must not same
    
        // Some cases that we have to handle in this request
        // First whether status is other than ignored and interested?
        const allowedStatus = ["ignored","interested"];
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid Status!");
        }

        // Second whether toUserid exist in the database or not
        const toUser = await User.findById(toUserId);
        if(!toUser){
            throw new Error(" User doesn't exists!");
        }

        // Third Whether toUser had also send request to us or earlier we have sent any request to same toUser

        const checkRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId:toUserId,toUserId:fromUserId},
                {fromUserId,toUserId}
            ]
        })

        if(checkRequest){
            throw new Error("Connection request already exists!");
        }

        const newConnection = await ConnectionRequest.create({
            fromUserId,toUserId,status
        });
        res.status(200).json({
            message:status==="interested"?`${req.user.firstName} is interested in ${toUser.firstName}`:`${req.user.firstName} ignored  ${toUser.firstName}`,
            data:newConnection,
        })



    }
    catch(e){
        res.status(400).json({message:"ERROR MESSAGE: "+e.message});
    }
    
})

// Request to accept or reject the request send to you

requestRouter.post("/request/review/:status/:id",userAuth,async(req,res)=>{
    // find whether logginIn person has any connection request or not
    // check status is in allowed field
    // check status is interested or not
    
    try{
        const loggedInUser = req.user._id;
        const {status,id} = req.params;

        const allowedField = ["accepted","rejected"];
        if(!allowedField.includes(status)){
            throw new Error("Status is not Valid!");
        }
        const checkRequest = await ConnectionRequest.findOne({
            _id:id,
            toUserId:loggedInUser,
            status:"interested"
        });
        console.log(checkRequest)
        if(!checkRequest){
            throw new Error("Request doesn't exists!");
        }
        checkRequest.status = status;
        const data = await checkRequest.save();
        res.status(200).json({
            message:`Request ${status} successfully!`,
            data,
        })
    }
    catch(e){
        res.status(400).json({message:"ERROR MESSAGE: "+e.message});

    }
})



module.exports = requestRouter;