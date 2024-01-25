import { async } from "rxjs";
import User from "../models/User.js";

export const search = async (req, res) => {
  try {
    const { search } = req.query;

    const where = {
      _id: { $ne: req.user._id },
    };

    if (search) {
      where["$or"] = [
        {phoneNo:  {$eq:+search || null, $ne:null}},
        {username: { $eq: search}}
      ];
    }else{
      return res.status(200).json({
        docs: [],
        totaldocs: 0
      });
    }

    const users = await User.find(where).select("_id username profile");

    return res.status(200).json({
      docs: users,
      totaldocs: users.length
    });
  } catch (err) {
    return res.status(400).send({
      status: "error",
      message: err.message ?? err,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const { search } = req.query;

    const where = {
      _id: { $ne: req.user._id },
    };

    if (search) {
      where["$or"] = [
        {phoneNo:  {$eq:+search || null, $ne:null}},
        {username: { $eq: search}}
      ];
    }

    const users = await User.find(where).select("_id username profile");

    return res.status(200).json({
      docs: users,
      totaldocs: users.length
    });
  } catch (err) {
    return res.status(400).send({
      status: "error",
      message: err.message ?? err,
    });
  }
};

export const update = async (req, res) =>{
  try {
    const { userId } = req; 

    const user = await User.findById(userId);
    if (!user) throw "User Doesn't Exist!";

    const document = {
      phoneNo:req.body.phoneNo,
      profile:{
          firstName:req.body.firstName,
          middleName:req.body.middleName,
          lastName:req.body.lastName,
          imgUrl:req.body.imgUrl,
          bio:req.body.bio
      }
    }

    user.set(document)
    await user.save()
    return res.status(200).json({
      status:"success",
      message:"User Updated Successfully",
      body:user
    });
    
  } catch (err) {
    return res.status(400).send({
      status: "error",
      message: err.message ?? err,
    });  
  }
}