import mongoose from "mongoose";
// User interface
interface User extends mongoose.Document {
  name: string;
  password: string;
  email: string;
  workTime?: number; // XXX not sure
  isActive?: boolean;
  teamInvitation?: any; // TODO change type
  teams?: any; // TODO change type
  tasks?: any; // TODO change type
  reports?: any; // TODO change type
  isVerified?: boolean;
  chats?: any; // TODO change type
  date?: Date;
  generateAuthToken(): string;
}

export default User;
