import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log(`DB connection error: ${error}`);
  }
};
