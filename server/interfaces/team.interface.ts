import mongoose from "mongoose";

interface NameAndId {
  name: string;
  id: string;
}

interface UserIDNAME {
  userId: string;
  userName: string;
}

interface Raport {
  userName: string;
  name: string;
  id: string;
  userId: string;
}

interface Task {
  userName: string;
  name: string;
  id: string;
  userId: string;
  status: string;
}

interface Team extends mongoose.Document {
  description: string;
  users: NameAndId[];
  name: string;
  date: string;
  tasks: Task[];
  raports: Raport[];
  calendarId: string;
  owner: NameAndId;
  invitations: UserIDNAME[];
}

export default Team;
