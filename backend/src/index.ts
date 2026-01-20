import express from "express";

import authRoute from "./routes/authRoute";
import studentRoute from "./routes/studentRoute";
import subjectRoute from "./routes/subjectRoute";

import cookieParser from "cookie-parser";
import cors from "cors";
import connectdb from "./connectdb";
import de from "dotenv";

de.config();

const app = express();
app.set("Etag", false);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.CLIENT_URI!,
      "http://localhost:5174",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
connectdb();

app.use("/auth", authRoute);
app.use("/students", studentRoute);
app.use("/subjects", subjectRoute);

app.listen(3000, () => {
  console.log("Connected To Port ✅");
});
