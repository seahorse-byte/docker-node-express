const mongoose = require("mongoose");

// create a new schema for the user

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User must have a name"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
});

// export user schema

const User = mongoose.model("User", userSchema);
module.exports = User;
