import mongoose, { MongooseDocument } from "mongoose";
import { string } from "joi";
import Team from "../interfaces/team.interface";

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
    id: mongoose.Schema.Types.ObjectId,
    required: true,
    name: string,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  users: {
    type: [
      {
        _id: false,
        name: string,
        id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  tasks: {
    type: [
      {
        _id: false,
        name: string,
        userName: string,
        userId: mongoose.Schema.Types.ObjectId,
        id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  raports: {
    type: [
      {
        _id: false,
        name: string,
        userId: mongoose.Schema.Types.ObjectId,
        userName: string,
        id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  calendar: {
    id: mongoose.Schema.Types.ObjectId,
  },
  invitations: {
    type: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        userName: string,
      },
    ],
  },
});

const teamModel = mongoose.model<Team & mongoose.Document>("Team", teamSchema);

export default teamModel;
