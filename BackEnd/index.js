import express, { json } from "express";
import { DbConnection } from "./DbConnection/Connection.js";
import authRoutes from "./Routes/AuthRoutes.js";
import subjectRoutes from "./Routes/SubjectController.js";
import studySessionRoutes from "./Routes/StudySession.js";
import multer from "multer";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;
const upload = multer();
await DbConnection();
app.use(express.json());
app.use(cookieParser());
app.use(upload.array());

app.use("/auth", authRoutes);
app.use("/subject", subjectRoutes);
app.use("/studysession", studySessionRoutes);
app.listen(PORT, () => {
  console.log(`Server is running at Port: ${PORT}`);
});
