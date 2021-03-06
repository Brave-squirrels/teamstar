import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../interfaces/user.interface";

// Creating commentSchema
const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 50,
  },
  workTime: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  teamInvitation: {
    type: [
      {
        _id: false,
        teamId: mongoose.Schema.Types.ObjectId,
        teamName: String,
      },
    ],
    default: [],
  },
  teams: {
    type: [
      {
        _id: false,
        teamId: mongoose.Schema.Types.ObjectId,
        teamName: String,
      },
    ],
    default: [],
  },
  tasks: {
    type: [
      {
        _id: false,
        teamId: mongoose.Schema.Types.ObjectId,
        taskId: mongoose.Schema.Types.ObjectId,
        taskName: String,
      },
    ],
    default: [],
  },
  reports: {
    type: [
      {
        _id: false,
        reportId: mongoose.Schema.Types.ObjectId,
        reportName: String,
      },
    ],
    default: [],
  },
  chats: {
    type: [
      {
        _id: false,
        teamId: mongoose.Schema.Types.ObjectId,
        chatId: mongoose.Schema.Types.ObjectId,
        chatName: String,
      },
    ],
    default: [],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  times: {
    type: {
      startTime: String,
      endTime: String,
    },
    default: { startTime: "07:00:00", endTime: "15:00:00" },
  },
  breakTime: {
    type: {},
    default: {
      b1: {
        start: "09:00:00",
        end: "09:15:00",
      },
      b2: {
        start: "11:15:00",
        end: "11:30:00",
      },
    },
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name },
    process.env.JWT_PRIVATE_KEY!
  );
  return token;
};

// Creating userModel
const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
