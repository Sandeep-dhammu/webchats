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

    const chat = Chat.findOne({
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
