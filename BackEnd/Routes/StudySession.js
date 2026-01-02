import express from "express";
import { verifyToken } from "../Middleware/verifyToken.js";
import { create, all, update, remove } from "../Controller/StudySession.js";

const studySessionRoutes = express.Router();

studySessionRoutes.get("/all", verifyToken, all);
studySessionRoutes.post("/create", verifyToken, create);
studySessionRoutes.put("/update/:id", verifyToken, update);
studySessionRoutes.delete("/delete/:id", verifyToken, remove);

export default studySessionRoutes;
