import { hashPassword } from "../utils/hashPassword.js";
import User from "../models/Users.js";

export async function registration(req, res) {
  const { login, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ login });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this login already exists." });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ login, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
