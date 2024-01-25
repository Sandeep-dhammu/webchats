import { Validator } from "node-input-validator";
import Message from "../models/Message.js";
import mongoose from "mongoose";

// export const create = async() => {
//     try {
//         const { chatId } = req.body;

//         const isValid = new Validator(req.body, {
//           chatId: "required",
//         });
    
//         if (!(await isValid.check())) throw isValid.errors;

//         if(!await Chat.findById(chatId)) throw "Chat doesn't exist";

//         await 

//     } catch (err) {
        
//     }
// }

export const search = async(req, res) => {
    try {
       const {search, chatId} = req.query;

       const isValid = new Validator(req.query, {
        chatId: "required",
       });
   
       if (!(await isValid.check())) throw isValid.errors;

       let where = {
              chatId:chatId
       }

       if(search){
        where["text"] = {regex:search, options:"i"}
       }

       let messages =  await Message.find(where)

       res.status(200).send({
        status:"success",
        message:"",
        body:messages
       });
       
    } catch (err) {
        res.status(400).send({
         status:"error",
         message:"",
         body:err?.message ??  err
        });
    }
}