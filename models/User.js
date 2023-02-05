import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv";

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name."],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name."],
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email.",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: 6,
    select: false,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
});

// HASHING PASSWORDS
UserSchema.pre("save", async function () {
  // This is to allow functionality when changing the value of a field in the document MongoDB
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// CREATE TOKEN
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// VERIFY PASSWORD MATCHES ENCRYPTION IN DB
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
