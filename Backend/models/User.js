import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:String,
    email:String,
    phoneNo:Number,
    password:String,
    verificationToken:String,
    
    status:{
        type:String,
        enum:["pending", "active", "inactive", "deleted"],
        default:"pending"
    },
    status:{
        type:String,
        enum:["pending", "active", "inactive", "deleted"],
        default:"pending"
    },
    
    profile:{
        firstName:String,
        middleName:String,
        lastName:String,
        imgUrl:String,
        bio:String
    },
    isNowActive:Boolean,
    lastActive:Date,
    createdAt:Date,
    updatedAt:{type:Date, default:Date.now()},
})


const User = mongoose.model('user', UserSchema);
export default User