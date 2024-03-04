// import bcrypt from "bcrypt";
const bcrypt = require("bcrypt");
const Users = require("../models/users.models");
const Tokens = require("../models/tokens.models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendEmail");
const { default: mongoose } = require("mongoose");

exports.signup = async (req, res) => {
  try {
    const payload = req.body;
     // console.log("signup payload",payload);
    // {
    //     name: '',
    //     email: '',
    //     password: '',
    //     mobileNumber: '',
    //     role: 3,
    //     address: ''
    // }

    if (!payload.password) {
      return res.status(400).send({
        message: "Password is required.",
      });
    }

    // Hashing using bcrypt

    const hashedOutput = await bcrypt.hash(payload.password, 15);
    payload.hashedPassword = hashedOutput;
    // {
    //     name: '',
    //     email: '',
    //     password: '',
    //     hashedPassword: '',
    //     mobileNumber: '',
    //     role: 3,
    //     address: ''
    // }
    delete payload.password;
   // console.log("payload.hashedPassword",payload.hashedPassword);
    // {
    //     name: '',
    //     email: '',
    //     hashedPassword: '',
    //     mobileNumber: '',
    //     role: 3,
    //     address: ''
    // }
 

    const newUser = new Users(payload);
    //console.log("newUser",newUser);
    newUser
      .save()
      .then((data) => {
        res.status(201).send({
          message: "User has been registered successfully.",
          data:newUser
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while registering the user.",
          data:error
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    // get email or password
    const { email, password } = req.body;

    let existingUser = await Users.findOne({ email: email });

    if (existingUser) {
      // Welcome123 -> hashedPassword
      let isValidUser = await bcrypt.compare(
        password,
        existingUser.hashedPassword
      ); // true or false

      if (isValidUser) {
        // Generate a token
        // jsonObj -> token;
        // {
        //   _id: existingUser._id;
        // }
        // Encryption
        const token = await jwt.sign(
          { _id: existingUser._id },
          process.env.SECRET_KEY
        );
     // req.headers.authorization = `Bearer ${token}`;
        res.cookie("accessToken", token, {
          expire: new Date() + 86400000,
        });

        return res.status(200).send({
          message: "User signed-in successfully.",
          token:token,
          data:existingUser.role
        });
      }

      return res.status(400).send({
        message: "Invalid credentials.",
      });
    }

    return res.status(400).send({
      message: "User does not exist.",
    });
    // check whether email is existing in our db or not -> Whether this user is existing user or not.
    // if(userExists) checking the credentials -> if matching get the userData and generateToken using that.... else error;
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

exports.signout = async (req, res) => {
  try {
    await res.clearCookie("accessToken");
    res.status(200).send({
      message: "User signed-out successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
   // console.log("heloooooooooooo");
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({
        message: "Email is required.",
      });
    }

    const existingUser = await Users.findOne({ email: email });

    if (!existingUser) {
      return res.status(400).send({
        message: "User with the given email does not exist",
      });
    }

    let existingToken = await Tokens.findOne({ userId: existingUser._id });

    if (existingToken) {
      await existingToken.deleteOne();
    }

    // Generating a random string
    const newToken = await crypto.randomBytes(32).toString("hex");

    // Hashing the random string to token
    const token = await bcrypt.hash(newToken, 15);

    const tokenPayload = new Tokens({
      userId: existingUser._id,
      token: token,
    });

    await tokenPayload.save();

    const link = process.env.FE_LINK+`token=${newToken}&userId=${existingUser._id}`;
   // console.log("Link",link);

    let isMailSent = await sendEmail(
      existingUser.email,
      "RESET PASSWORD LINK",
      {
        resetPasswordLink: link,
      }
    );

    if (isMailSent) {
      return res.status(200).send({
        message: "Reset password link has been sent to your email.",
      });
    }

    return res.status(500).send({
      message: "Error while sending reset-password link",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { userId, token, newPassword } = req.body;

    const resetToken = await Tokens.findOne({ userId: userId });

    if (!resetToken) {
      return res.status(400).send({ message: "Token does not exist." });
    }

    const isValidToken = await bcrypt.compare(token, resetToken.token);

    if (!isValidToken) {
      return res.status(400).send({
        message: "Invalid token",
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 15);

    Users.findByIdAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(userId),
      },
      { $set: { hashedPassword: newHashedPassword } }
    )
      .then((data) => {
        res.status(200).send({
          message: "Password has been reset successfully.",
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while resetting the password",
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

// bcrypt -> is used for hashing
// jsonwebtoken -> is used for converting jsonObj to token and vice-versa (Encryption and Decryption)
// crypto -> is used to generate some random string.