import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

export const JWT_SECRET = process.env.JWT_SECRET;

export function auth(req, res, next) {
  const token = req.headers.authorization;

  const response = jwt.verify(token, JWT_SECRET);

  if (response) {
    req.userId = response.userId;
    next();
  } else {
    res.status(403).json({
      message: "Incorrect creds",
    });
  }
}
