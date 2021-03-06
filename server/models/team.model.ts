import mongoose, { MongooseDocument } from "mongoose";
import { string } from "joi";
import Team from "../interfaces/team.interface";
import { STATUS } from "../interfaces/task.interface";

// Creating raportSchema
const teamSchema = new mongoose.Schema<Team>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 24,
  },
  description: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 254,
  },
  owner: {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  users: {
    type: [
      {
        _id: false,
        name: {
          type: String,
        },
        id: mongoose.Schema.Types.ObjectId,
        status: {
          type: Boolean,
          default: false
        }
      },
    ],
  },
  tasks: {
    type: [
      {
        _id: false,
        name: {
          type: String,
        },
        userName: { type: String },
        userId: mongoose.Schema.Types.ObjectId,
        id: mongoose.Schema.Types.ObjectId,
        status: {
          type: STATUS,
          default: STATUS.TODO,
        },
      },
    ],
  },
  raports: {
    type: [
      {
        _id: false,
        name: String,
        userId: mongoose.Schema.Types.ObjectId,
        userName: String,
        id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  calendarId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  invitations: {
    type: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        userName: String,
      },
    ],
  },
});

const teamModel = mongoose.model<Team & mongoose.Document>("Team", teamSchema);

export default teamModel;
