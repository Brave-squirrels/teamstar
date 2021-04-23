import mongoose from "mongoose";

import TeamArr from './teamArr.interface'
import Event from './event.interface';

interface Calendar extends mongoose.Document {
  team: TeamArr,
  events: Event[]
}

export default Calendar;
