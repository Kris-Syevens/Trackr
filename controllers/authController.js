import User from "../models/User.js";
import attachCookies from "../utils/attachCookies.js";
import { StatusCodes } from "http-status-codes";
import {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";

// REGISTER CONTROLLER
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email | !password) {
    throw new BadRequestError("please provide all values");
  }

  const userAlreadyExists = await User.findOne({ email });

  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use.");
  }

  const user = await User.create({ firstName, lastName, email, password });
  const token = user.createJWT();

  attachCookies({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      firstName: user.firstName,
    },
    location: user.location,
  });
};

// LOGIN CONTROLLER
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values.");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials.");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials.");
  }

  const token = user.createJWT();
  user.password = undefined;
  attachCookies({ res, token });

  res.status(StatusCodes.OK).json({ user, location: user.location });
};

// UPDATE USER CONTROLLER
const updateUser = async (req, res) => {
  const { email, firstName, lastName, location } = req.body;
  if (!email || !firstName || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();
  attachCookies({ res, token });

  res.status(StatusCodes.OK).json({
    user,
    location: user.location,
  });
};

// GET CURRENT USER CONTROLLER
const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

// LOGOUT USER CONTROLLER
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export { register, updateUser, login, getCurrentUser, logout };
