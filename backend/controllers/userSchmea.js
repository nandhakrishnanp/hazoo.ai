
const bcrypt = require("bcrypt");
const user = require("../model/userShmea");
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await user.findOne({
      username,
    });

    if (!existingUser)
      return res.json({ message: "User doesn't exist" }).status(404);

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordCorrect) {
   
      res
        .json({ message: "User logged in successfully",token:"a#ce%6dbe" , user: existingUser })
        .status(200);
    } else {
      res.json({ message: "Invalid credentials"  }).status(401);
    }
  } catch (error) {
    res.json({ message:error.message }).status(500);
  }
};

const registerUser = async (req, res) => {
  const { name, username, password, district, mobilenumber } = req.body;

  try {
    const existingUser = await user.findOne({
      username,
    });
    if (existingUser) {
      return res.json({ message: "User already exists" }).status(400);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await user.create({
      username,
      password: hashedPassword,
      mobilenumber,
    });
 
    res
      .json({ message: "User registered successfully" })
      .status(200);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
};

module.exports = {
  loginUser,
  registerUser,
};
