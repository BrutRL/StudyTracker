import mongoose from "mongoose";
import { User } from "./UserSchema.js";
import { Subject } from "./SubjectSchema.js";

const GoalSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: Subject },
  targetHours: { type: Number, require: true },
  deadline: { type: Date, require: true },
  progress: { type: Number, require: true },
});

export const Goal = mongoose.model("Goal", GoalSchema);
