const User = require('../Models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Register the new User
const SignUp = async (req, res) => {
  const user = req.body;

  try {
    const foundUser = await User.findOne({ email: user.email })
    if (foundUser) {
      return res.status(401).json({ msg: "User already exist" })
    }
    const hashedPassword = await bcrypt.hash(user.password, 10)

    const newUser = new User({
      userName: user.userName,
      email: user.email,
      password: hashedPassword,
    })

    await newUser.save();
    const token = jwt.sign({
      userName: newUser.userName,
      email: newUser.email,
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
    const foundUser = await User.findOne({ email: user.email });
    if (foundUser) {
      const result = await bcrypt.compare(user.password, foundUser.password);
      if (result === true) {
        const token = jwt.sign(
          {
            email: foundUser.email,
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



module.exports = { SignIn, SignUp }