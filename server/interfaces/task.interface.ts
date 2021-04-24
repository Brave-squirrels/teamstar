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
  TODO,
  INPROGRESS,
  DONE,
}

interface Task extends mongoose.Document {
  users: UserIDNAME[];
  name: string;
  description: string;
  status: STATUS;
  team: TeamIDNAME;
}

export default Task;
