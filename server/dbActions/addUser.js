import { connectDB } from "../db.js";
import Users from "../models/Users.js";

export const addUser = async (login, username, password) => {
  try {
    await connectDB();
    const user = new Users({
      login,
      username,
      password,
    });
    await user.save();
    mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};
