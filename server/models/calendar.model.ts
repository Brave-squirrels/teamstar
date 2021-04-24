import mongoose from "mongoose";
import Calendar from "../interfaces/calendar.interface";
import { string } from "joi";

// Creating raportSchema
const calendarSchema = new mongoose.Schema<Calendar>({
  events: [
      {
          author: {
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
          },
          fromHour: {
              type: String,
              required: true
          },
          toHour: {
              type: String,
              required: true
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
