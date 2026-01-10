import mongoose from "mongoose";
import { User } from "./UserSchema.js";
import { Subject } from "./SubjectSchema.js";

const StudySessionSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: Subject },
  duration: { type: Number, require: true },
  notes: { type: String, maxlength: 100 },
  date: { type: Date, require: true },
});

export const StudySession = mongoose.model("StudySession", StudySessionSchema);
