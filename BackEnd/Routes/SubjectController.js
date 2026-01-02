import express from "express";
import {
  create,
  all,
  update,
  remove,
} from "../Controller/SubjectController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
const subjectRoutes = express.Router();

subjectRoutes.get("/all", verifyToken, all);
subjectRoutes.post("/create", verifyToken, create);
subjectRoutes.put("/update/:id", verifyToken, update);
subjectRoutes.delete("/delete/:id", verifyToken, remove);

export default subjectRoutes;
