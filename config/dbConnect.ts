import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!).then(() => {
      console.log("connected to MONGO_DB");
    });
  } catch (error) {
    console.log("connection error ", error);
  }
};

export default connectDB;

// OrangeMoon$%

// OrangeMoon$%
