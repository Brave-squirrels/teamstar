import mongoose from "mongoose";

import Event from './event.interface';

interface Calendar extends mongoose.Document {
  events: Event[]
}

export default Calendar;
