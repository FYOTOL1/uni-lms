import express from "express";

import updateSchemaRoute from "./routes/updateRoute";
import calendarRoute from "./routes/calendarRoute";
import userRoute from "./routes/userRoute";
import subjectRoute from "./routes/subjectRoute";
import lectureRoute from "./routes/lectureRoute";
import authRoute from "./routes/authRoute";

import cookieParser from "cookie-parser";
import connectdb from "./connectdb";
import cors from "cors";
import de from "dotenv";

de.config();

const app = express();
app.set("Etag", false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.CLIENT_URI!,
      "http://localhost:5176",
      "http://localhost:5175",
      "http://localhost:5174",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
connectdb();

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/subjects", subjectRoute);
app.use("/lectures", lectureRoute);
app.use("/calendars", calendarRoute);
app.use("/update-schema", updateSchemaRoute);

app.listen(3000, () => {
  console.log("Connected To Port ✅");
});
