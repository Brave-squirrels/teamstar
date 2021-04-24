import mongoose from "mongoose";

import Message from "./message.interface";

// Chat interface
interface Chat extends mongoose.Document {
  name: string;
  teamId: string;
  messages: Message[];
}

export default Chat;
