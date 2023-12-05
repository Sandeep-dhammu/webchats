import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    users:[{
        userId:mongoose.Types.ObjectId,
        isAdmin:Boolean,
        isActive:Boolean,
        lastActive:Date,
        unreadMessage:{type:Number, default:0},
        status:{
            type:String,
            enum:["pending", "accepted", "rejected"],
            default:"pending",
        },
    }],
    status:{
        type:String,
        enum:["pending", "active", "inactive", "deleted"],
        default:"pending",
    },
    type:{
        type:String,
        enum:["solo", "dual", "group"],
        default:"dual"
    },
    imgUrl:String,
    unread:Number,
    lastMessage:String,
    // createdAt:Date,
    // updatedAt:{type:Date, default:Date.now()},
}, {timestamps:true})

const Chat = mongoose.model("chat", ChatSchema);

export default Chat;