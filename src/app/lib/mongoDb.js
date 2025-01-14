import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    alert(error);
  }
};
export default connectMongoDB;