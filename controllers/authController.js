// import user model
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashpasword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      password: hashpasword,
    });

    res.status(201).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
