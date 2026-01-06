import express from "express";
import { verifyToken } from "../Middleware/verifyToken.js";
import {
  create,
  all,
  update,
  remove,
  summary,
  count,
} from "../Controller/StudySession.js";

const studySessionRoutes = express.Router();

studySessionRoutes.get("/all", verifyToken, all);
studySessionRoutes.get("/count", verifyToken, count);
studySessionRoutes.get("/summary", verifyToken, summary);
studySessionRoutes.post("/create", verifyToken, create);
studySessionRoutes.put("/update/:id", verifyToken, update);
studySessionRoutes.delete("/delete/:id", verifyToken, remove);

export default studySessionRoutes;
