import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    balance: { type: Number, required: true },
  },
  { timestamps: true }
);

const bankAccounts =
  mongoose.models.bankAccounts || mongoose.model("bankAccounts", accountSchema);

export default bankAccounts;