import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 20 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

export const User = mongoose.model("User", UserSchema);
