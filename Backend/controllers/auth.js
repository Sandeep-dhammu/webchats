import { Validator } from "node-input-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Session from "../models/Session.js";
import { accountForgotPassword, accountVerification } from "../services/emailService.js";

const jwtKey = "webChatForLiveChatSandeep075oo81";

function generateVeifyToken() {
  return (
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2)
  );
}

export const signUp = async (req, res) => {
  try {
    const isValid = new Validator(req.body, {
      username: "required",
      email: "required|email",
      password: "required",
    });

    if (!(await isValid.check())) throw isValid.errors;

    let user = await User.findOne({ email: { $eq: req.body.email } });
    if (user && user.status !== "pending")
      throw "User already exist with this email!";

    let document = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      password: await bcrypt.hash(req.body.password, 10),
      verificationToken: generateVeifyToken(),
    };

    if (user && user.status == "pending") {
      user.set(document);
     await user.save();
    } else {
      user = await User.create(document);
    }

    // if (user && user.status == "pending") {
    //   user.set(document)
    //   await user.save()
    // } else {
    //   user = await User.create(document);
    // }
    accountVerification(user);

    res.status(200).json({
      status: "success",
      message: "User Created Successfully!",
      body: { _id: user._id },
    });
  } catch (err) {
    return res.status(201).json({
      status: "error",
      message: err.message || err || "Something went wrong",
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const isValid = new Validator(req.body, {
      email: "required",
      password: "required",
    });

    if (!(await isValid.check())) throw isValid.errors;

    let user = await User.findOne({
      $and: [
        {
          $or: [
            { email: { $eq: req.body.email } },
            { username: { $eq: req.body.email } },
          ],
          status: { $nin: ["pending", "deleted"] },
        },
      ],
    }).select("-verificationToken");
    if (!user) throw "User doesn't exist with this email!";
    if (user.status == "inactive")
      throw "Your Account is inactive. Contact with Helpline to resolve the issue!";
    if (!bcrypt.compareSync(req.body.password, user.password))
      throw "Email or Password is incorrect!";

    let session = await Session.findOne({
      userId: { $eq: user._id },
      status: "active",
    });
    if (!session) {
      let token = jwt.sign({ user: user._id }, jwtKey);
      session = await Session.create({
        userId: user._id,
        token,
        status: "active",
      });
    }
    if (user.status === "active") {
      user._doc["x-access-token"] = session.token;
    }
    delete user._doc._id;
    delete user._doc.password;
    delete user._doc.verificationToken;

    res.status(200).json({
      status: "success",
      message: "Sign In Successfully",
      body: user,
    });
  } catch (err) {
    return res.status(201).json({
      status: "error",
      message: err.message || err || "Something went wrong",
    });
  }
};

export const verify = async (req, res) => {
  try {
    const isValid = new Validator(req.body, {
      token: "required",
      // userId: "required",
    });

    if (!(await isValid.check())) throw isValid.errors;

    let user = await User.findOne({
      verificationToken: { $eq: req.body.token },
    }).select("-password");

    if (!user) "User doesn't exist with this email!";

    if (!user.verificationToken)
      throw "Verification code not found. Please try with another account!";

    if (user.verificationToken !== req.body.token)
      throw "You entered a invalid OTP!";

    if (user.status == "pending") user.status = "active";
    user.verificationToken = null;

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "User verified successfully!",
    });
  } catch (err) {
    return res.status(201).json({
      status: "error",
      message: err.message || err || "Something went wrong",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const isValid = new Validator(req.body, {
      email: "required|email",
    });

    if (!(await isValid.check())) throw isValid.errors;

    let user = await User.findOne({
      email: { $eq: req.body.email},
      status: { $ne: "deleted" } ,
    }).select("-password");

    if (!user) throw "User doesn't exist with this email!";
    if (user.status == "inactive")
      throw "Your Account is inactive. Contact with Helpline to resolve the issue!";

    user.verificationToken = generateVeifyToken()

    await user.save();

    accountForgotPassword(user);

    res.status(200).json({
      status: "success",
      message: "User found!",
      body: user,
    });
  } catch (err) {
    return res.status(201).json({
      status: "error",
      message: err.message || err || "Something went wrong",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const isValid = new Validator(req.body, {
      token: "required",
      password: "required",
    });

    if (!(await isValid.check())) throw isValid.errors;

    let user = await User.findOne({
      verificationToken: { $eq: req.body.token },
    }).select("-password");

    if (!user) throw "Provided token is expired!";

    if (user.verificationToken !== req.body.token)
      throw "You provide a invalid Token!";

    user.verificationToken = null;
    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password reset successfully!",
      body: user,
    });
  } catch (err) {
    return res.status(201).json({
      status: "error",
      message: err.message || err || "Something went wrong",
    });
  }
};
