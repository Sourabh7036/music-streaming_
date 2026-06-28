import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected Successfully");
  } catch (err) {
    console.error("Error during connecting Database", err);
    process.exit(1);
  }
};


export default connectDb;