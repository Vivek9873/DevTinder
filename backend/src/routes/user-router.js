

const express = require("express")
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")
const userAuth = require("../middleware/auth");
const userRouter = express.Router();

const USER_SAVE_INFO = "firstName lastName photoUrl age gender about";
// check the pending connection requests recieved for loggedin user
userRouter.get("/user/requests/recieved",userAuth,async(req,res)=>{
    // firstly get all requests status interested 
    // use ref and populate to show them
    try{
        const loggedInUserId = req.user._id;
        const checkPendingRequests = await ConnectionRequest.find({
            toUserId:loggedInUserId,
            status:"interested",
        }).populate("fromUserId",USER_SAVE_INFO);
        res.status(200).json({
            message:"Pending Requests Found Successfully!",
            data:checkPendingRequests,
        })

    }
    catch(e){
        res.status(400).json({message:"ERROR MESSAGE: "+e.message});
    }

})

// check all the connections that have been made by the user
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
            $or:[{fromUserId:loggedInUser._id,status:"accepted"},
                {toUserId:loggedInUser._id,status:"accepted"}]
            
        }).populate("fromUserId",USER_SAVE_INFO).populate("toUserId",USER_SAVE_INFO);

        const data = connections.map(item=>
            {

                
                if(item.fromUserId._id.toString()===loggedInUser._id.toString()){
                    return item.toUserId;
                }
                else{
                    return item.fromUserId;
                }
            }
        )
        res.json({data});

    }
    catch(e){
        res.status(400).json({message:"ERROR MESSAGE: "+e.message});
    }
    
    
})

// get the user in the feed
userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
        // In feed his own profile must not shown in feed
        // His connections, his connection request's sent profiles, his ignored profiles
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit>50?50:limit;
        const skip = (page - 1)* limit;
        
        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id},
            ]
        })
        const hideProfiles = new Set();
        connections.forEach(profile=>{
            hideProfiles.add(profile.fromUserId.toString());
            hideProfiles.add(profile.toUserId.toString());
        })

        const feed = await User.find({
            $and:[
                {_id:{$nin:Array.from(hideProfiles)}},
                {_id:{$ne:loggedInUser._id}},
            ]
        }).select(USER_SAVE_INFO).skip(skip).limit(limit);

        res.json({
            data:feed,
        })

    }
    catch(e){
        res.status(400).json({message:"ERROR MESSAGE: "+e.message});

    }
})
module.exports = userRouter;