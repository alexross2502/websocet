import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chatUsers",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Messages = mongoose.model("Messages", MessagesSchema);

export default Messages;
