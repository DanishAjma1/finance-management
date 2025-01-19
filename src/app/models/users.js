import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User",usersSchema);
export default User;