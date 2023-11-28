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
    
    profile:{
        firstName:String,
        middleName:String,
        lastName:String,
        imgUrl:String,
        bio:String
    }
})


const User = mongoose.model('user', UserSchema);
export default User