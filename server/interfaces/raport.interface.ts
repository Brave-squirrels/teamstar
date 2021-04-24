import mongoose from "mongoose";
// User interface
interface Raport extends mongoose.Document {
  name: string;
  description: string;
  author: {
    name: string;
    id: string;
  };
  team: {
    id: string;
    name: string;
  };
  date?: Date;
}

export default Raport;
