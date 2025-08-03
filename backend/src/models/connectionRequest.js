
const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",

    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["accepted","ignored","interested","rejected"],
            // message:`{VALUE} is not a status type`,
        },
        
    }
},{timestamps:true});


connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself!");
    }
    next();
})

module.exports = mongoose.model("ConnectionRequest",connectionRequestSchema);