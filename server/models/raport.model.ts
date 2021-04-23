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
    id: String,
    required: true,
    name: string,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  team: {
    id: String,
    name: String,
    required: true,
  },
});

// Creating raportModel
const raportModel = mongoose.model<Raport & mongoose.Document>(
  "Raport",
  raportSchema
);

export default raportModel;
