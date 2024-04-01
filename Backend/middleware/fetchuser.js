const jwt = require("jsonwebtoken");
const secret = "FDM_Secret_String";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Please authenticate with a valid token" });
  }
  try {
    const data = jwt.verify(token, secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate with a valid token" });
  }
};
module.exports = fetchuser;