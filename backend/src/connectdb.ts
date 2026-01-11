import mongoose from "mongoose";
import de from "dotenv";

de.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!);
    console.log("Connected to MongoDB ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌:" + error);
  }
};

export default connect;
