const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keySecret = "kapilranarishabhbishtbhaijayeshb";
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not a valid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// hash password
// here we are actually hashing our password before saving the data into our DB
// ye 12 symoblise kar raha hai kitne rounds tak hash karna hai jitne zyada round rahega hashing ka utna hi humara password secure rahega
userSchema.pre("save", async function (next) {
  // this line means that only if we want to change our password then we can modify otherwise our password should be in becrypt state
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  // ye next() ka matlab hai password ko hash karne ke baad jo process data ko save karne ki hai DB may wo chalu rahei
  next();
});

// token generate
userSchema.methods.generateAuthToken = async function () {
  try {
    let genToken = jwt.sign({ _id: this._id }, keySecret, {
      // time limit for token after how much time the token gets expires
      expiresIn: "1d",
    });
    // storing generated token inside tokens field of schema
    this.tokens = this.tokens.concat({ token: genToken });
    await this.save();
    return genToken;
  } catch (error) {
    res.status(422).json(error);
  }
};

// creating model
const userModel = new mongoose.model("users", userSchema);

module.exports = userModel;
