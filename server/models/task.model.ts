import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../interfaces/user.interface";
import Task, { STATUS } from "../interfaces/task.interface";
import { string } from "joi";

// Creating commentSchema
const taskSchema = new mongoose.Schema<Task>({
  users: {
    type: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        userName: String,
      },
    ],
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 24,
    required: true,
  },
  description: {
    type: String,
    minlength: 0,
    maxlength: 254,
    required: true,
  },
  status: {
    type: STATUS,
    default: STATUS.TODO,
  },
  team: {
    teamName: String,
    teamId: String,
  },
});

// Creating userModel
const taskModel = mongoose.model<Task & mongoose.Document>("Task", taskSchema);

export default taskModel;
