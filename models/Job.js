import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv";

const JobSchema = mongoose.Schema(
  {
    //
    company: {
      type: String,
      required: [true, "Please provide a name."],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide a name."],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "Enter City/State",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the user."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
