import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    text:String,
    userId:String,
    chatId:String,
    type:{
        type:String,
        enum:["text", "file"],
        default:"text"
    },
    media:[{
        url:String,
        name:String,
        ext:String,
        size:Number,
        type:{
            type:String,
            enum:["image", "video", "audio", "file", "gif"]
        }
    }],
    status:{
        type:String,
        enum:["pending", "sent", "seen", "deleted"],
        default:"pending"
    },
    createdAt:Date,
    updatedAt:{type:Date, default:Date.now}
});

const Message = mongoose.model("message", MessageSchema);

export default Message;