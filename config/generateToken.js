const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  return jwt.sign({ ...data }, process.env.JWT_SECRET, {
    expiresIn: "1800s",
  });
};

module.exports = generateToken;
