import express from "express";

import updateSchemaRoute from "./routes/updateSchemaRoute";
import calendarRoute from "./routes/calendarRoute";
import studentRoute from "./routes/studentRoute";
import subjectRoute from "./routes/subjectRoute";
import authRoute from "./routes/authRoute";

import cookieParser from "cookie-parser";
import connectdb from "./connectdb";
import cors from "cors";
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
app.use("/calendars", calendarRoute);
app.use("/updateSchema", updateSchemaRoute);

app.listen(3000, () => {
  console.log("Connected To Port ✅");
});
