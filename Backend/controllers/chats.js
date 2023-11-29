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

    let chat = await Chat.findOne({
      "users.userId": { $in: [user._id, req.userId] },
    });
    if (chat)
      return res.status(200).send({
        status: "success",
        message: "",
        body: chat,
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

    return res.status(200).send({
      status: "success",
      message: "",
      body: chat,
    });
  } catch (err) {
    return res.status(201).send({
      status: "error",
      message: err.message ?? err,
    });
  }
};
export const search = async (req, res) => {
  try {
    const { search } = req.body;

    const where = {
      "users.userId": { $eq: req.userId },
    };

    if (search) {
    }

    const chats = await Chat.aggregate([
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
    ]).then(
      (chats) => {
        return res.status(200).json({
          docs: chats,
          totaldocs: chats.length,
        });
      },
      (err) => {
        throw err;
      }
    );
  } catch (err) {
    return res.status(201).send({
      status: "error",
      message: err.message ?? err,
    });
  }
};
export const getById = async (req, res) => {
  try {
  } catch (err) {
    return res.status(201).send({
      status: "error",
      message: err.message ?? err,
    });
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
