const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const secretKey = process.env.JWT_SECRET;

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "invalid email" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);


    if (!passwordMatch) {
      return res.status(401).json({ error: "invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      secretKey,
      { expiresIn: "1h" }
    );

    res.json({ token, message: `Welcome back!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = {
  login,
};
