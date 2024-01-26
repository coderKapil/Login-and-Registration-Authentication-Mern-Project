const express = require("express");
const router = new express.Router();
const userModel = require("../Model/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

// for user Registration basically we are storing user data into our DB
// register api
router.post("/register", async (req, resp) => {
  const { fname, email, password, cpassword } = req.body;

  if (!fname || !email || !password || !cpassword) {
    resp.status(422).json({ error: "please fill all details" });
  }

  try {
    // here actually we are doing a validation that the email entered by user while register is already exist in our db or not if yes then a error will be thwon that this user is already registered
    // yaha par jo email key ki jagah hai wo email hoga mera jo email mera db may hai aur jo value wala email hai wo email hai jo user enter karega registartion ke time
    const preUser = await userModel.findOne({ email: email });
    if (preUser) {
      resp.status(422).json({ error: "This email already exist" });
    } else if (password !== cpassword) {
      resp
        .status(422)
        .json({ error: "Password and Confirm Password not matched" });
    } else {
      // adding data to our db
      const finalUser = new userModel({
        fname,
        email,
        password,
        cpassword,
      });
      //   here we are basically storing our data inside our db
      const storeData = await finalUser.save();
      //   console.log(storeData);
      resp.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    resp.status(422).json(error);
    console.log("catch block error");
  }
});

// Login api

router.post("/login", async (req, resp) => {
  // console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    resp.status(422).json({ error: "please fill all details" });
  }

  try {
    const userValid = await userModel.findOne({ email: email });

    // here we are comparing password with our user enetr password and DB stored password in hashed format by decrypting it using bcrypt
    if (userValid) {
      // this will gives us value in either true or false
      const isMatch = await bcrypt.compare(password, userValid.password);

      if (!isMatch) {
        resp.status(422).json({ error: "Invalid User" });
      } else {
        // if agar user match kar jata hai to us case may we will generate a token
        // token generate
        const token = await userValid.generateAuthToken();
        // this token will be used to generate cookies which help in sending the token towards the frontend
        // cookie generate
        resp.cookie("usercookie", token, {
          // current time se 15 min baad token expires hojaye
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });
        // ab token ko aage frontend may bhejenge
        const result = {
          userValid,
          token,
        };
        resp.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    resp.status(401).json(error);
    console.log("catch block");
  }
});

// user valid
router.get("/validuser", authenticate, async (req, resp) => {
  try {
    const validUserOne = await userModel.findOne({ _id: req.userId });
    resp.status(201).json({ status: 201, validUserOne });
  } catch (error) {
    resp.status(401).json({ status: 401, error });
  }
});

// user logout
router.get("/logout", authenticate, async (req, resp) => {
  try {
    req.rootuser.tokens = req.rootuser.tokens.filter((currEle) => {
      return currEle.token !== req.token;
    });
    resp.clearCookie("usercookie", { path: "/" });
    req.rootuser.save();
    resp.status(201).json({ status: 201 });
  } catch (error) {
    resp.status(401).json({ status: 401, error });
  }
});

module.exports = router;

// hashing compares the password rather than encrypting and decrypting
// 1234--> hashvalue1--> value inside db
//1234--> hashvalu2--> value of password enter by user at the time of login, (hashvalue1 == hashvalue2) = true user is valid
// for hashing we are going to usea npm package bcrypt
