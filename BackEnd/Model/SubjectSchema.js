import mongoose from "mongoose";
import { User } from "./UserSchema.js";
const SubjectSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
  name: { type: String, minlength: 3, maxlength: 50, require: true },
  targetHours: { type: Number, required: true },
  color: { type: String, required: true, default: "#3B82F6" },
  createdAt: { type: Date, default: Date.now() },
});

export const Subject = mongoose.model("Subject", SubjectSchema);
