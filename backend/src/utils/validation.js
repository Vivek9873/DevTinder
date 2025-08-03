const validator = require("validator");

const validateSignUpData = (req) =>{
    const {firstName,lastName,email,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not Provided!");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid!");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong!");
    }
};

const validateProfileEditData = (req)=>{
    const updateDetails = req.body;
    const notallowedFields = ["email","password"];
    const isNotAllowedFields = Object.keys(updateDetails).every((field)=>notallowedFields.includes(field));
    return !isNotAllowedFields;  
}

module.exports = {validateSignUpData,validateProfileEditData};