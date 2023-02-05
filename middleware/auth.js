import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === "63dc30eb10b9f951e26ab338";
    // Adding a "user" key/value pair to the req object and assigning it to payload so that the controller can use it to set off and verify said token data sent in on the request.
    req.user = { userId: payload.userId, testUser };
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  next();
};

export default auth;
