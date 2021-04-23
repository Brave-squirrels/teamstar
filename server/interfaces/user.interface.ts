import mongoose from "mongoose";

import TeamArr from "./teamArr.interface";
import InviteArr from "./inviteArr.interface";
import TaskArr from "./taskArr.interface";
import ChatArr from "./chatArr.interface";

// User interface
interface User extends mongoose.Document {
  name: string;
  password: string;
  email: string;
  workTime?: number; // XXX not sure
  isActive?: boolean;
  teamInvitation?: InviteArr[];
  teams?: TeamArr[];
  tasks?: TaskArr[];
  reports?: any; // TODO change type
  isVerified?: boolean;
  chats?: ChatArr[];
  date?: Date;
  generateAuthToken(): string;
}

export default User;
