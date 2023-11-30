import { Validator } from "node-input-validator";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const create = async (req, res) => {
  try {
    const { userId } = req.body;

    const isValid = new Validator(req.body, {
      userId: "required",
    });

    if (!(await isValid.check())) throw isValid.errors;

    const user = await User.findById(userId);
    if (!user) throw "User Doesn't Exist!";

    const where = {
      $and:[
        {"users.userId": user._id,},
        {"users.userId": req.userId}
      ]
      ,
    }

    let chat = await getById(req, where);  

    // let chat = await Chat.findOne({
    //   "users.userId": { $and: [user._id, req.userId] },
    // });

    if (chat && chat.length)  
      return res.status(200).send({
        status: "success",
        message: "",
        body: chat[0],
      });

    let document = {
      users: [
        {
          userId: req.user._id,
          isAdmin: true,
        },
        {
          userId: user._id,
          isAdmin: false,
        },
      ],
      createdAt: Date.now(),
    };

    chat = await Chat.create(document);

    const responseBody = {
      _id:chat._id,
      type:chat.type,
      status:chat.status,
      opponentUsers:[{
        details:{
          isAdmin:false,
          status:"pending",
          userId:user._id
        },
        profile:user.profile,
        username:user.username,
      }],
      createdAt:chat.createdAt
    }

    return res.status(200).send({
      status: "success",
      message: "",
      body: responseBody,
    });
  } catch (err) {
    return res.status(201).send({
      status: "error",
      message: err.message ?? err,
    });
  }
};

export const search = async (req, res, next) => {
  try {
    const { search } = req.query;

    const where = {
      "users.userId": { $eq: req.userId },
    };
    const whereInLookup = {$match:{}};

    if (search) {
      whereInLookup["$match"] = { $or : [
        {"opponentUsersData.username": { $eq: search}},
        {"opponentUsersData.profile.firstName": { $regex: search, $options:"i"}},
        {"opponentUsersData.profile.lastName": { $regex: search, $options:"i"}}
      ]};
    }

    let chats = await getById(req, where, whereInLookup );

      return res.status(200).json({
        docs: chats,
        totaldocs: chats.length,
      });
    
  } catch (err) {
    return res.status(201).send({
      status: "error",
      message: err.message ?? err,
    });
  }
};

const getById = async (req, where, whereInLookup={$match:{}}) => {
  try {
   return await Chat.aggregate([
      { $match: where },
      { $unwind: "$users" },
      { $match: { "users.userId": { $ne: req.userId } } },
      // {
      //   $group: {
      //     _id: '$_id',
      //     opponentUsers: { $addToSet: '$users.userId' },
      //     // other fields you may want to include
      //   },
      // },
      {
        $lookup: {
          from: "users",
          let: { userId: "$users.userId" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$_id", "$$userId"] } },
            },
            {
              $project: {
                _id: 1,
                username: 1,
                profile: 1,
              },
            },
          ],
          as: "opponentUsersData",
        },
      },
      whereInLookup,
      {
        $project: {
          _id: 1,
          status: 1,
          type: 1,
          imgUrl: 1,
          unread: 1,
          createdAt: 1,
          lastMessage: 1,
          opponentUsers: {
            $map: {
              input: "$opponentUsersData",
              as: "userData",
              in: {
                $mergeObjects: [
                  {
                    $cond: {
                      if: { $eq: ["$$userData._id", "$users.userId"] },
                      then: "$$userData",
                      else: null,
                    },
                  },
                  { details: "$users" },
                ],
              },
            },
          },
        },
      },
    ])
  } catch (err) {
    throw err
    // return res.status(201).send({
    //   status: "error",
    //   message: err.message ?? err,
    // });
  }
};

export const remove = async (req, res) => {
  try {
  } catch (err) {
    return res.status(201).send({
      status: "error",
      message: err.message ?? err,
    });
  }
};
