require("dotenv").config()
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth-router");
const profileRouter = require("./routes/profile-router");
const requestRouter = require("./routes/request-router");
const userRouter = require("./routes/user-router");
const cors = require("cors")
const http = require("http");
const socket = require("socket.io");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat-routes");
const app = express(); // This is the instance of the express js application


const corsOptions = {
    origin: "https://devtinder-btzp.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};



app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)
app.use("/",chatRouter)



const server = http.createServer(app);
initializeSocket(server);

const PORT = process.env.PORT || 3000;
connectDB()
    .then(()=>{
        console.log("MongoDb connected successfully!");
        server.listen(PORT,()=>{
            console.log("Server is successfully listening at the port: ",PORT)  // THis will be called when aur server is listening at port
        })  // app is listening on port 3000 and this will create the server
    })
    .catch((err)=>console.log("Database Connection Unsuccessful!"));
