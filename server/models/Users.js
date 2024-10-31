import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("chatUsers", UsersSchema);

export default Users;
