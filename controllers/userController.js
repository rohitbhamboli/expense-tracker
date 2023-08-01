const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "Fields should not be empty" });
    }
    const userValid = await User.findOne({ email });
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      const token = await userValid.generateAuthToken();
      if (isMatch) {
        return res
          .cookie("expensetoken", token, {
            expires: new Date(Date.now() + 86400000),
            httpOnly: true,
          })
          .status(200)
          .send(userValid);
      } else {
        return res.status(403).json({ error: "Invalid Credentials" });
      }
    } else {
      return res.status(403).send("User not Found");
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid login" });
  }
};

//registration controller
const registerController = async (req, res) => {
  const { name, email, phone, profession, password, cpassword } = req.body;
  // console.log(req.body);
  if (!name || !email || !phone || !profession || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({ message: "Email is already used" });
    }
    if (password !== cpassword) {
      return res.status(409).json({ message: "Passwords did not match" });
    }
    const user = new User({
      name,
      email,
      phone,
      profession,
      password,
      cpassword,
    });

    await user.save();
    return res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    return res.status(400).json({ message: "Registration failed", error });
  }
};

module.exports = { loginController, registerController };
