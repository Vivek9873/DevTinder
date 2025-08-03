

const socket = require("socket.io");

const crypto = require("crypto");
const Chat = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const getSecretRoomId = (userId,targetUserId)=>{
    return crypto.createHash("sha256").update([userId,targetUserId].sort().join("_")).digest("hex");
}

const initializeSocket = (server)=>{
    const io = socket(server,{
        cors:{
            origin: "https://devtinder-7m4m.onrender.com",
        }
    });
    io.on("connection",(socket)=>{
        socket.on("joinChat",({firstName,lastName,userId,targetUserId})=>{
            const roomId = getSecretRoomId(userId,targetUserId);
            socket.join(roomId);
            
        })
        
        socket.on("sendMessage",async({firstName,lastName,userId,targetUserId,text})=>{
            try{
                const roomId = getSecretRoomId(userId,targetUserId);
                // console.log(firstName+" "+text)
                // save mesagge to the databse

                // checking whether sender and reciever are friends or not
                const checkStatus = await ConnectionRequest.findOne({
                    $or:[
                        {fromUserId:userId,toUserId:targetUserId,status:"accepted"},
                        {fromUserId:targetUserId,toUserId:userId,status:"accepted"},

                    ]
                })
                if(!checkStatus){
                    throw new Error("Connection doesn't exist!")
                }
                let chat = await Chat.findOne({
                    participants:{$all:[userId,targetUserId]},
                })
                if(!chat){
                    chat = new Chat({
                        participants:[userId,targetUserId],
                        messages:[],
                    })
                }
                chat.messages.push({
                    senderId:userId,
                    text
                })
                await chat.save();
                io.to(roomId).emit("messageReceived", { firstName,lastName, text });

               
            }
            catch(err){
                console.log(err);
            }

        })
        socket.on("disconnect",()=>{

        })
    })
}

module.exports = initializeSocket;
