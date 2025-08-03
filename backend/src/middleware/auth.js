const jwt = require("jsonwebtoken")
const User = require("../models/user");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const userAuth = async(req,res,next)=>{
    try{
        // get the token from the cookie
        const {token} = req.cookies;
        if(!token){
            throw new Error("Unauthorized User!")
        }
        // validate the token 
        const decodeToken =  jwt.verify(token,JWT_SECRET_KEY);
        const {_id} = decodeToken;
        console.log(decodeToken)
        // get the user
        const user = await User.findById(_id);

        if(!user){
            throw new Error("User doesn't exists!");
        }
        req.user = user;
        next();

    }
    catch(e){
        res.status(400).send("ERROR MESSAGE: "+ e.message);
    }
}


module.exports = userAuth;