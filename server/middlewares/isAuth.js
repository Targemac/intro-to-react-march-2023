const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  //  check if headers are present
  const header = req?.headers?.authorization || req?.headers?.Authorization;

  // obtain token
  const token = header.split(" ")[1];

  // check if token is valid
  jwt.verify(token, process.env.LOGIN_SECRET, (err, decoded) => {
    // if token dont match
    if (err) {
      return res
        .status(403)
        .json({ message: `Access Denied!: ${err.message}` });
    }
    // if token match
    /**
      req.user can be accessed 
      globally to check 
      if user is loggedIn
    **/
    req.user = decoded.user._id;
    next();
  });
};

module.exports = isAuth;
