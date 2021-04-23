import mongoose from "mongoose";

interface NameAndId {
  name: string;
  id: string;
}

interface Raport {
  userName: string;
  name: string;
  id: string;
  userId: string;
}

interface Team extends mongoose.Document {
  description: string;
  users: NameAndId[];
  name: string;
  date: string;
  tasks: Raport[];
  raports: Raport[];
  calendarId: string;
  owner: NameAndId;
  invitations: NameAndId[];
}

export default Team;
