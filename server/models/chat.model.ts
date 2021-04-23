import mongoose from "mongoose";
import Chat from "../interfaces/chat.interface";

// Creating commentSchema
const chatSchema = new mongoose.Schema<Chat>({
  name: {
    type: String,
    required: true,
  },

  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  messages: {
    type: [
      {
        authorName: String,
        authorId: mongoose.Schema.Types.ObjectId,
        content: String,
        date: String,
      },
    ],
    default: [],
  },
});

// Creating chatModel
const chatModel = mongoose.model<Chat & mongoose.Document>("Chat", chatSchema);

export default chatModel;
