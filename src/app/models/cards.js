import mongoose, { Schema } from "mongoose";

const CardSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  number: { type: String, required: true },
  expiry: { type: String, required: true },
  cvv: { type: String, required: true },
  pin: { type: String, required: true },
  limit: { type: Number, required: false },
  state: { type: String, required: true },
  showDetails: { type: Boolean, default: false },
  showPin: { type: Boolean, default: false },
});
const Card = mongoose.models.Card || mongoose.model("Card", CardSchema);
export default Card;
