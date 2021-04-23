import mongoose from "mongoose";
import Chat from "../interfaces/chat.interface";

// Creating commentSchema
const chatSchema = new mongoose.Schema<Chat>({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxLength: 50,
  },

  teamId: {
    type: String,
    required: true,
    minlength: 4,
    maxLength: 50,
  },

  messages: {
    type: [
      {
        messageName: String,
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
