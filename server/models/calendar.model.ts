import mongoose from "mongoose";
import Calendar from "../interfaces/calendar.interface";
import { string } from "joi";

// Creating raportSchema
const calendarSchema = new mongoose.Schema<Calendar>({
  team: {
      id: {
          type: mongoose.Schema.Types.ObjectId
      },
      name: {
          type: String
      }
  },
  events: [
      {
          creator: {
                  id: {
                      type: mongoose.Schema.Types.ObjectId
                  },
                  name: {
                      type: String
                  }
          },
          title: {
              type: String,
              required: true
          },
          start: {
              type: Date,
              required: true
          },
          end: {
              type: Date,
              required: true
          },
          desc: {
              type: String
          }

      }
  ]
  
});

// Creating raportModel
const calendarModel = mongoose.model<Calendar & mongoose.Document>(
  "Calendar",
  calendarSchema
);

export default calendarModel;
