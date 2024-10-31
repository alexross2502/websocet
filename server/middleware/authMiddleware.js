import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

export const authenticate = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Users.findById(decoded.id).select("username");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid." });
  }
};
