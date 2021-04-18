import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../interfaces/user.interface";

// Creating commentSchema
const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 50,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name },
    process.env.JWT_PRIVATE_KEY!
  );
  return token;
};

// Creating userModel
const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
