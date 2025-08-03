import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"
import { createServerConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const Chat = () => {
    

    const selectedUser = useSelector(store=>store.chat);
    console.log("id hai ye h",selectedUser._id)
    const targetUserId = selectedUser._id;
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("");

    const user = useSelector(store=>store.user);
    const userId = user?user._id :"";
    const handleSendMessage = ()=>{
        const socket = createServerConnection();
        socket.emit("sendMessage",({firstName:user.firstName,lastName:user.lastName,userId,targetUserId,text:newMessage}))
        setNewMessage("")
    }

    const fetchChatMessages = async()=>{
        const chat = await axios.post(BASE_URL+"/chat/connections",{targetUserId},{withCredentials:true});
        console.log("Message hoon mein ",chat.data.messages);
        const chatMessages = chat?.data?.messages.map(msg=>{
            const time = new Date(msg?.createdAt).toLocaleTimeString('en-US',{
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })
            const date = new Date(msg?.createdAt).toLocaleDateString('en-GB');
            // console.log("TIme hai ",time)
            return{firstName:msg?.senderId?.firstName,lastName:msg?.senderId?.lastName,text:msg?.text,time,date}
        })
        setMessages(chatMessages);
    }
    useEffect(()=>{
        fetchChatMessages();
    },[targetUserId])
    useEffect(()=>{
        console.log(userId)
        console.log("useEffect se hoon ",targetUserId)
        if(!userId) return;
        const socket = createServerConnection();

        socket.emit("joinChat",{firstName:user.firstName,lastName:user.lastName,userId,targetUserId})
        socket.on("messageReceived",({firstName,lastName,text})=>{
            console.log(firstName + " " + text)
            setMessages(message=>[...message,{firstName,lastName,text}]);
        })
        return ()=>{
            socket.disconnect();
        }
    },[userId,targetUserId])
  return (
    <div className="w-full mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
        <h1 className="p-5 border-b border-gray-600">Chat</h1>
        
        <div className="flex-1 overflow-scroll p-5">
            {
                messages.map((msg,index)=>{
                    return <div>
                     {index!==0?msg.date!==messages[index-1].date?<span className="flex justify-center">{msg.date}</span>:<></>:<span className="flex justify-center">{msg.date}</span>}
                    <div key={index} className={"chat " + (user.firstName===msg.firstName?"chat-end":"chat-start")}>
                        <div className="chat-header">
                            {msg.firstName + " " + msg.lastName}
                            <time className="text-xs opacity-50">{msg.time}</time>
                        </div>
                        <div className={"chat-bubble "+ (user.firstName===msg.firstName?"bg-primary":"bg-secondary")}>{msg.text}</div>
                        {/* <div className="chat-footer opacity-50">Seen</div> */}
                    </div>
                    </div>
                })
            }
        </div>
        <div className="p-5 border border-gray-600 flex gap-2 items-center">
            <input value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} className="flex-1 border border-gray-600 text-white rounded-lg p-2 "/>
            <button onClick={handleSendMessage} className="btn btn-secondary">Send</button>
        </div>
    </div>
  )
}

export default Chat