import { User } from "../Model/UserSchema.js";
import bcrypt from "bcrypt";
export const specific = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json({ ok: true, data: user });
  } catch (error) {
    res.status(400).json({ ok: false, message: `Failed to get user ${error}` });
  }
};

export const update = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(req.userId, {
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(200).json({ ok: true, message: `Account updated successfully` });
  } catch (error) {
    res
      .status(400)
      .json({ ok: false, message: `Failed to update user ${error}` });
  }
};
