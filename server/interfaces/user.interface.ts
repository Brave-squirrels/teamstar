import mongoose from "mongoose";
// User interface
interface User extends mongoose.Document {
  name: string;
  password: string;
  email: string;
  date?: Date;
  isVerified?: boolean;
  generateAuthToken(): string;
}

export default User;