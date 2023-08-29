const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const requireAuth = async (req, res, next) => {
  // verify authenfication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorozed" });
  }
};
module.exports = requireAuth;

module.exports.requireUser = (req, res, next) => {
  // verify authenfication
  const { authorization } = req.headers;

  if (authorization && authorization.split(" ")[1]) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("No token");
  }
};

module.exports.checkUser = (req, res, next) => {
  // verify authenfication
  const { authorization } = req.headers;

  if (authorization && authorization.split(" ")[1]) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        req.user = null;
        // res.cookie("jwt", ""), { maxAge: 1 };
        console.log("noooooo");
        next();
      } else {
        let user = await User.findById(decodedToken._id);
        req.user = user;
        // console.log(decodedToken.id);
        console.log(req.user);
        next();
      }
    });
  } else {
    req.user = null;
    next();
  }
};
