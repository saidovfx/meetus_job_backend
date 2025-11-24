import jwt from "jsonwebtoken";

const accessToken = jwt.sign(
  {
    id: "691022f39757f86a5fbc45b8",
    username: "daler",
  },
  process.env.JWT_SECRET,
  { expiresIn: "365d" }
);

console.log(accessToken);
