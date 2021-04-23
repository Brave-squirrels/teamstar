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

interface Team extends mongoose.Document {
  description: string;
  users: NameAndId[];
  name: string;
  date: string;
  tasks: Raport[];
  raports: Raport[];
  calendarId: string;
  owner: NameAndId;
  invitations: UserIDNAME[];
}

export default Team;
