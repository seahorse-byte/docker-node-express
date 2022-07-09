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

    req.session.user = user;

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

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User Not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid password",
      });
    }

    req.session.user = user;
    res.status(200).json({
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
