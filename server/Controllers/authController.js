const User = require('../Models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Get the users
const GetUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

//Register the new User
const SignUp = async (req, res) => {
  const user = req.body;

  try {
    const foundUser = await User.findOne({ userName: user.userName })
    if (foundUser) {
      return res.status(401).json({ msg: "User already exist" })
    }
    const hashedPassword = await bcrypt.hash(user.password, 10)

    const newUser = new User({
      userName: user.userName,
      password: hashedPassword,
    })

    await newUser.save();
    const token = jwt.sign({
      userName: newUser.userName,
      id: newUser._id
    }, process.env.KEY);
    res.status(200).json({ newUser, token });
  } catch (error) {
    return res.status(400).json({ msg: "Register failed" })
  }
}

//User Login
const SignIn = async (req, res) => {
  const user = req.body;
  try {
    const foundUser = await User.findOne({ userName: user.userName });
    if (foundUser) {
      const result = await bcrypt.compare(user.password, foundUser.password);
      if (result === true) {
        const token = jwt.sign(
          {
            id: foundUser._id,
          }, process.env.KEY);
        res.status(200).json({ foundUser, token },);
      }
      if (result === false) {
        res.status(402).json({ msg: "wrong password" });
      }
    }
    else {
      res.status(401).json({ msg: "you need to register before" });
    }
  } catch (error) {
    res.status(400).json({ msg: "server error" });
  }
}

//Delete User
const DeleteUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findOneAndDelete({ _id: userId });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}


module.exports = { SignIn, SignUp, GetUsers, DeleteUsers }