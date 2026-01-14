import express from "express";
import studentRoute from "./routes/studentRoute";
import authRoute from "./routes/authRoute";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectdb from "./connectdb";
import de from "dotenv";

de.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URI!, "http://localhost:5173"],
    credentials: true,
  })
);
connectdb();

app.use("/students", studentRoute);
app.use("/auth/", authRoute);

app.listen(3000, () => {
  console.log("Connected To Port ✅");
});
