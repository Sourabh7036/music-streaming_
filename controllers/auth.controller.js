import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { username, email, password, role = "user" } = req.body;

  const isUserExits = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExits) {
    return res.status(409).json({
      message: "User already exits ",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hash,
    role,
  });

  console.log(user);

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User created successfully",
    data: {
      id: user._id,
      username,
      email,
      role,
    },
  });
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!isUserExists) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  const IsPasswordvalid = await bcrypt.compare(password, isUserExists.password);

  if (!IsPasswordvalid) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    { id: isUserExists._id, role: isUserExists.role },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Login Successfully",
    user: {
      id: isUserExists._id,
      username: isUserExists.username,
      email: isUserExists.email,
      role: isUserExists.role,
    },
  });
};

const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logout successfully",
  });
};

export default { registerUser, loginUser , logoutUser};
