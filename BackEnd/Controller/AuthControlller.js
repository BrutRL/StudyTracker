import jwt from "jsonwebtoken";
import bcrpyt from "bcrypt";
import { User } from "../Model/UserSchema.js";
import validator from "validator";
import cookieParser from "cookie-parser";
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  try {
    if (name.length > 20 || name.length < 2)
      return res.status(400).json({
        message: `Name must be not lower than 2 character and must be not greater than 20`,
      });
    if (!validator.isEmail(email))
      return res.status(400).json({ message: `Invalid Email format` });

    if (!regexPassword.test(password))
      return res.status(400).json({
        message: `Password must be 8 character must have number, special Character and capital letter`,
      });

    const hashedPassword = await bcrpyt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(200)
      .json({ ok: true, message: `Account Register Successfully` });
  } catch (error) {
    res
      .status(400)
      .json({ ok: false, message: `Failed to register user ${error}` });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: `Account Dont exist` });

    const matchedPassword = await bcrpyt.compare(password, user.password);
    if (!matchedPassword)
      return res.status(404).json({ message: `Wrong password` });

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to false for development
      sameSite: "Lax", // Use "Lax" for development to allow cross-origin requests
      maxAge: 3 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ ok: true, message: `Login successfull`, token: token });
  } catch (error) {
    res
      .status(401)
      .json({ ok: false, message: `Failed to login user ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ ok: true, message: `Logout successfull` });
  } catch (error) {
    res
      .status(401)
      .json({ ok: false, message: `Failed to logout user ${error}` });
  }
};

export const authorized = async (req, res) => {
  try {
    res.status(200).json({ ok: true, message: req.user });
  } catch (error) {
    res.status(404).json({ ok: false, message: `Unauthorized ${error}` });
  }
};
