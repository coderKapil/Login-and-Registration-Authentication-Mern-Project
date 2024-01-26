const jwt = require("jsonwebtoken");
const userModel = require("../Model/userSchema");
const keySecret = "kapilranarishabhbishtbhaijayeshb";

const authenticate = async (req, resp, next) => {
  // getting the token from headers.authorization then verify it with the help of jwt with token and secret key if valid return a id through which user veryfies
  try {
    const token = req.headers.authorization;
    const verifytoken = jwt.verify(token, keySecret);
    // finding the user the first key _id is id of db and second value is the generated id we get on authenticate the user
    const rootuser = await userModel.findOne({ _id: verifytoken._id });
    if (!rootuser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootuser = rootuser;
    req.userId = rootuser._id;

    next();
  } catch (error) {
    resp
      .status(401)
      .json({ status: 401, message: "Unauthorized no token provided" });
  }
};

module.exports = authenticate;
