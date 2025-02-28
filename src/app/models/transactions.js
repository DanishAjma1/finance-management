import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  accountType: {
    type: String,
    default:"Debit",
  },
  acc_num: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user_id: { type: Schema.Types.ObjectId, ref: "User",required:true },
});

const Transaction =  mongoose.models.Transaction || mongoose.model("Transaction",transactionSchema);
export default Transaction;
