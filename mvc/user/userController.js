const asyncHandler = require("express-async-handler");
const User = require("./userModel");
const generateToken = require("../../config/generateToken");
const bcrypt = require("bcrypt");
const { replaceS3BaseUrl } = require("../../utils");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !password || !email || !req?.files?.file) {
    res.status(400);
    throw new Error("Please Provide All Credentials");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic: req?.files.file && replaceS3BaseUrl(req?.files?.file[0]?.location),
  });
  if (user) {
    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Failed Creating USer");
  }
});
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    console.log(
      "🚀 ~ file: userController.js:56 ~ updateUser ~ req.user._id,:",
      req.user._id
    );
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name,
        ...(req?.files.file
          ? { pic: replaceS3BaseUrl(req?.files?.file[0]?.location) }
          : {}),
      },
      {
        useFindAndModify: false,
        new: true,
      }
    );
    if (user) {
      res.status(200).send({
        token: generateToken({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
        }),
      });
    } else {
      res.status(400);
      throw new Error("Failed Creating USer");
    }
  } catch (e) {
    res.status(400);
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  let user;
  user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).send({
      token: generateToken({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
      }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Id Password");
  }
});

module.exports = { registerUser, authUser, updateUser };
