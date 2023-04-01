import jwt from "jsonwebtoken";

function generateAuthToken(user) {
  const token = jwt.sign(user, process.env.SESSION_SECRET, { expiresIn: "1h" });
  return token;
}

export { generateAuthToken };
