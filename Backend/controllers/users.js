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
    }

    const users = await User.find(where).select("_id username profile");

    return res.status(200).json({
      docs: users,
      totaldocs: users.length
    });
  } catch (err) {
    return res.status(201).send({
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
    return res.status(201).send({
      status: "error",
      message: err.message ?? err,
    });
  }
};
