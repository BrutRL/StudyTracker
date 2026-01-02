import mongoose from "mongoose";
import { User } from "./UserSchema.js";
const SubjectSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
  name: { type: String, minlength: 3, maxlength: 50, require: true },
  description: { type: String, minlength: 10, maxlength: 100 },
  createdAt: { type: Date, default: Date.now() },
});

export const Subject = mongoose.model("Subject", SubjectSchema);
