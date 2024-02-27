const jwt = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
  try {
    const { cookies } = req;
    let accessToken="";
    console.log("Cookies.accesstoken",cookies.accessToken);
    if(cookies.accessToken){
      console.log("1");
      accessToken=cookies.accessToken;
    }
    else{
      console.log("2");
    const token = req.headers['authorization'];
    console.log("req.headers['authorization'] in Auth",req.headers['authorization']);
    accessToken=token.split(' ')[1];
     console.log("token.split(' ')[1]",accessToken);
    }
    if (accessToken) {
      console.log("3");
      const obj = await jwt.verify(accessToken, process.env.SECRET_KEY); // Decryption from token to jsonObj
       console.log("obj._id",obj._id);
       req._id=obj._id;
      if (!obj._id) {
        return res.status(401).send({
          message: "Not Authenticated",
        });
      }
       return next();
    }
     return res.status(401).send({
      message: "Not Authenticated.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};