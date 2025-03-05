import mongoose from "mongoose";

const connectionDb = async () => {
  try {
    const connection = await mongoose.connect("mongodb://localhost:27017/ToDo");
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log("Error in database connection:", error);
    process.exit(1);
  }
};
export default connectionDb;
