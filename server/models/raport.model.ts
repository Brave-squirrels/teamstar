import mongoose from "mongoose";
import Raport from "../interfaces/raport.interface";
import { string } from "joi";

// Creating raportSchema
const raportSchema = new mongoose.Schema<Raport>({
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
  author: {
    id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  team: {
    id: mongoose.Schema.Types.ObjectId,
    name: String,
  },
});

// Creating raportModel
const raportModel = mongoose.model<Raport & mongoose.Document>(
  "Raport",
  raportSchema
);

export default raportModel;
