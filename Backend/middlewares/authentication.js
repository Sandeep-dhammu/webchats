import jwt  from "jsonwebtoken";
import Session from "../models/Session.js";
import mongoose from "mongoose";
import User from "../models/User.js";

const jwtKey = "webChatForLiveChatSandeep075oo81";


export const ValidateToken = async(req, res, next) => {
  try {
    const token =
      req.headers["x-access-token"] ||
      req.query["x-access-token"] ||
      req.body["x-access-token"];

    if (!token) {
      throw "token is required!";
    }
    
    let { user } =  jwt.verify(token, jwtKey);

    if(!user) throw "Provide a Invalid Token!"
    // userId = new  mongoose.Types.ObjectId(userId)
    const session = await Session.findOne({userId:user, status:"active"});

    if(!session) throw "Session Expired! Please Sign in."

    user = await User.findById(user).select("-password");

    if(!user) throw "Provide a Invalid Token!"

    req["userId"] = user._id;
    req["user"] = user;

    next()

  } catch (err) {
    return res.status(403).send({
      status: "error",
      message: err.message ?? err,
    });
  }
};
