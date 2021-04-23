import mongoose from "mongoose";

import TeamArr from "./teamArr.interface";
import InviteArr from "./inviteArr.interface";
import TaskArr from "./taskArr.interface";
import ChatArr from "./chatArr.interface";
import ReportArr from "./reportArr.interface";

// User interface
interface User extends mongoose.Document {
  name: string;
  password: string;
  email: string;
  workTime?: string;
  isActive?: boolean;
  teamInvitation?: InviteArr[];
  teams?: TeamArr[];
  tasks?: TaskArr[];
  reports?: ReportArr[];
  isVerified?: boolean;
  chats?: ChatArr[];
  date?: Date;
  generateAuthToken(): string;
}

export default User;
