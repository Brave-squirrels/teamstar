import mongoose from "mongoose";

interface UserIDNAME {
  userName: string;
  userId: string;
}

interface TeamIDNAME {
  teamName: string;
  teamId: string;
}

export enum STATUS {
  DONE,
  TODO,
  INPROGRESS,
}

interface Task extends mongoose.Document {
  users: UserIDNAME[];
  name: string;
  description: string;
  status: STATUS;
  team: TeamIDNAME;
}

export default Task;
