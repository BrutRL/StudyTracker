import express from "express";
import {
  register,
  login,
  logout,
  authorized,
} from "../Controller/AuthControlller.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", verifyToken, logout);
authRoutes.get("/authorized", verifyToken, authorized);

export default authRoutes;
