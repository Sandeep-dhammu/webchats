import { Server } from "socket.io";
import User from "./models/User.js"
import Chat from "./models/Chat.js"
import { getByConditon } from "./controllers/chats.js";
import Message from "./models/Message.js";
import mongoose, { disconnect } from "mongoose";
const connectedUsers={};
const connectedChatsUsers={};
export const SocketInit = (app) => {
    const io = new Server(app, {
        cors:{
            origin:"*"
        }
    })
    io.on("connection", (socket) => {
        let chat = null
        console.log(`The Socket:${socket.id} is ${socket.connected ? 'connected':'not connected'}`)
        const online = async(userId) => {
            try {
                connectedUsers[userId] = socket.id
                let user = await User.findById(userId);
                if( user ){
                    user.isNowActive = true 
                    await user.save();
                }
            } catch (err) {
                console.error(err);
            }
        }
        const join = async(data = {}) => {
            try {
                const {userId, chatId} = data
                if(!userId || !chatId) throw "Invalid data!"
                const user = await User.findById(userId).select("_id username")
                chat = await Chat.findById(chatId)
                
                if(!chat || !user) throw "invalid data!"
                
                if(!connectedChatsUsers[chatId]){
                    connectedChatsUsers[chatId] = {} 
                }
                
                connectedChatsUsers[chatId][userId] = socket.id;
                // Chat.updateOne({},)
                await Chat.findOneAndUpdate({_id:chatId, "users.userId":user?._id, "users.unreadMessage":{$ne:0}}, {"users.$.unreadMessage":0})
                // chat.set({"users.unreadMessage":0}).$where({"users.userId":{$eq:userId}})
                // chat = chat.users.map(user => user.userId !== userId);

            } catch (err) {
                console.error(err)
            }
        }
        const sendMessage = async (data = {}) =>{
            try {
                const {chatId = chat?._id, userId , message} = data;

                let document = {
                  text: message.text,
                  userId,   
                  chatId:chatId ?? chat?._id ,
                  type: message.type ,
                };

                const entity = await Message.create(document);
                chat.lastMessage = entity.text

                for (const opponent of chat.users) {
                    if(JSON.stringify(opponent.userId) !== userId){
                        if(connectedChatsUsers[chatId][opponent?.userId]){
                            io.to(connectedChatsUsers[chatId][opponent?.userId]).emit("onMessageSent", entity);
                        }else if(connectedUsers[opponent?.userId]){
                            io.to(connectedUsers[opponent?.userId]).emit("newMessage");
                            opponent.unreadMessage++
                        }else{
                            opponent.unreadMessage++
                        }
                    }
                }

                await chat.save()
            } catch (err) {
                console.error(err)
            }
        }
        const left = async (data) => {
            try {
                const {chatId, userId} = data;
                if(!chatId || !userId) throw "invalid data";
                if(connectedChatsUsers[chatId]){
                    delete connectedChatsUsers[chatId][userId];
                    if(!Object.keys(connectedChatsUsers[chatId]).length){
                        delete connectedChatsUsers[chatId]
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
        const offline = async (userId) => {
            try {
                if(!userId) throw "user id required";
                if(connectedUsers[userId]){
                    delete connectedUsers[userId];
                }
                let user = await User.findById(userId);
                if( user ){
                    user.isNowActive = false 
                    user.lastActive = Date.now() 
                    user.save();
                }
                socket.disconnect()
                console.log(`The Socket:${socket.id} is ${socket.disconnected ? 'disconnected':'still connected'}`)
            } catch (err) {
                console.error(err);
            }
        }
        socket.on("online", online);
        socket.on("join", join);
        socket.on("sendMessage", sendMessage);
        socket.on("left", left);
        socket.on("offline", offline);
    })
}
