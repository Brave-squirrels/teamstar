import mongoose from "mongoose";

// Message interface
interface Message extends mongoose.Document {
  authorName: string;
  authorId: string;
  content: string;
  date?: Date;
}

export default Message;
