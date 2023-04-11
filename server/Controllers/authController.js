const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get the users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Register a new user
const signUp = async (req, res) => {
  const user = req.body;

  try {
    const foundUser = await User.findOne({ userName: user.userName });
    if (foundUser) {
      return res.status(401).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new User({
      userName: user.userName,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign(
      {
        userName: newUser.userName,
        id: newUser._id,
      },
      process.env.KEY
    );
    res.status(200).json({ newUser, token });
  } catch (error) {
    return res.status(400).json({ msg: "Registration failed" });
  }
};

// User Login
const signIn = async (req, res) => {
  const user = req.body;
  try {
    const foundUser = await User.findOne({ userName: user.userName });
    if (foundUser) {
      const result = await bcrypt.compare(user.password, foundUser.password);
      if (result === true) {
        const token = jwt.sign(
          {
            id: foundUser._id,
          },
          process.env.KEY
        );
        res.status(200).json({ foundUser, token });
      }
      if (result === false) {
        res.status(402).json({ msg: "Wrong password" });
      }
    } else {
      res.status(401).json({ msg: "You need to register first" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Server error" });
  }
};

// Delete User
const deleteUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findOneAndDelete({ _id: userId });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  signIn,
  signUp,
  getUsers,
  deleteUsers,
};
