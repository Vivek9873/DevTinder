

const mongoose =require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        unique:true,
        minLength:4,
        maxLength:50,


    },
    lastName:{
        type:String,
        
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email!");
            }
        }
        
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Invalid Password!");
            }
        }
        
    },

    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","other"],
            // message:`{VALUE} is not a valid gender type`,
        }
            
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtu74pEiq7ofeQeTsco0migV16zZoBwSlGg&s",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL");

            }
        }
        
    },
    about:{
        type:String,
        default:"This is the default about of the user"
    },
    skills:{
        type:[String],
    }
},{timestamps:true})

// userSchema.method.getJWT = function (){
//     const token = jwt.sign({_id:this._id},"DEV@Tinder$619",{expiresIn:"1h"});
//     return token;
// }

// userSchema.method.validatePassword = async function (password) {
//     const isPasswordCorrect = await bcrypt.compare(password,this.password);
//     return isPasswordCorrect;
// }

module.exports = mongoose.model("User",userSchema);