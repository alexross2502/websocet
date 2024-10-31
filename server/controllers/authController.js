import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export async function auth(req, res) {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in." });
  }
}
