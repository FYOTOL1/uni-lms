import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://fyotol:fyotol2008@cluster0.9i2rytx.mongodb.net/lms-uni?appName=Cluster0"
    );
    console.log("Connected to MongoDB ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌:" + error);
  }
};

export default connect;
