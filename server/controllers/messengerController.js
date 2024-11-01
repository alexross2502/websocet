import Messages from "../models/Messages.js";
import { sendMessageToClients } from "../server.js";
import Users from "../models/Users.js";
import jwt from "jsonwebtoken";

export async function getMessages(req, res) {
  try {
    const messages = await Messages.find().populate("user", "username avatar");
    const formattedMessages = messages.map((message) => ({
      id: message.createdAt.getTime(),
      user: message.user.username,
      text: message.text,
      avatar: `http://localhost:8000/${message.user.avatar.replace(
        /\\/g,
        "/"
      )}`,
      createdAt: message.createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isCurrentUser: message.user._id.toString() === req.user.id.toString(),
    }));

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении сообщений" });
  }
}

export async function postMessage(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userLogin = await Users.findById(decoded.id).select("login");
  const { text } = req.body;
  try {
    const newMessage = new Messages({ user: req.user.id, text });
    await newMessage.populate("user", "username avatar");

    const user = await Users.findById(req.user.id);

    await newMessage.save();
    const formattedMessage = {
      id: newMessage.createdAt.getTime(),
      user: req.user.username,
      login: userLogin.login,
      text: newMessage.text,
      avatar: `http://localhost:8000/${user.avatar.replace(/\\/g, "/")}`,
      createdAt: newMessage.createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    //console.log(user);
    //console.log(req.user);
    //console.log(newMessage.user);

    sendMessageToClients(formattedMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при отправке сообщения" });
  }
}
