const Users = require("../models/users.models");

exports.isAdmin = async (req, res, next) => {
  try {
    const { _id } = req;
    console.log("admin",_id);
   const currentUser = await Users.findOne({ _id: _id });
     console.log("currentUser",currentUser);
    if (currentUser) {
         console.log("inside currentUser Admin");
      if (currentUser.role !== 1) {
        console.log("currentUser,role",currentUser.role);
        return res.status(401).send({
          message: "Not Authorized: Admin Resource",
        });
      }
      console.log("IsAdmin end1");
          return next();
    }
    console.log("IsAdmin end 2");
    return res.status(401).send({
      message: "Not Authorized: Admin Resource",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

exports.isPrivilegedUser = async (req, res, next) => {
  try {
    const { _id } = req;
        console.log("_id",_id)
    const currentUser = await Users.findOne({ _id: _id });
         console.log("currentUser",currentUser);
    if (currentUser) {
      console.log("inside currentUser privilege");
      if (currentUser.role !== 2) {
        console.log("currentUser.role",currentUser.role);
        return res.status(401).send({
          message: "Not Authorized: Privileged User Resource",
        });
      }
       return next();
    }
      return res.status(401).send({
      message: "Not Authorized: Privileged User Resource",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};