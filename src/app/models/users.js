import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    email: String,
    password: String,
    confirmPassword: String,
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User",usersSchema);
export default User;