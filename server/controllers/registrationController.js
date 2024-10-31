import { hashPassword } from "../utils/hashPassword.js";
import User from "../models/Users.js";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const avatarsDir = path.join(__dirname, "uploads", "avatars");

const getRandomAvatar = () => {
  try {
    const files = fs.readdirSync(avatarsDir);
    if (files.length === 0) {
      throw new Error("Не найдены изображения аватаров");
    }
    const randomIndex = Math.floor(Math.random() * files.length);
    return path.join("uploads", "avatars", files[randomIndex]);
  } catch (error) {
    console.error("Ошибка при получении аватара:", error);
    return null;
  }
};

export async function registration(req, res) {
  const { login, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ login });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Пользователь с такой почтой уже существует" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      login,
      username,
      password: hashedPassword,
      avatar: getRandomAvatar(),
    });

    await newUser.save();
    res.status(201).json({ message: "Регистрация успешна" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
