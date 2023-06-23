const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;

const { generateRandomImage } = require("../utils/generateImage");

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max).toString();
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: generateRandomImage({ str: getRandomInt(10) }),
    },
    roleId: {
      type: String,
      default: "user",
    },
    background: {
      type: String,
      default:
        "https://res.cloudinary.com/dvpy1nsjp/image/upload/v1687325279/pexels-nadiia-yahaha-14056950.jpg",
    },
    description: {
      type: String,
      default: "This is description channel!",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ name: "text" });
const User = mongoose.model("User", userSchema);
User.createIndexes({ name: "text" });

module.exports = User;
