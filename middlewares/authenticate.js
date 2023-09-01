// const jwt = require("jsonwebtoken");

// const { HttpError } = require("../helpers");

// const { User } = require("../models/user");

// const { SECRET_KEY } = process.env;

// const authentificate = async (req, _, next) => {
//   const { autorization = "" } = req.headers;
//   const [bearer, token] = autorization.split(" ");
//   if (bearer !== "Bearer") {
//     next(HttpError(401));
//   }
//   try {
//     const { id } = jwt.verify(token, SECRET_KEY);
//     const user = await User.findById(id);
//     if (!user || !user.token || user.token !== token) {
//       next(HttpError(401));
//     }
//     req.user = user;
//     next();
//   } catch {
//     next(HttpError(401));
//   }
// };

// module.exports = authentificate;

const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

// const authentificate = async (req, res, next) => {
//   const { authorization = "" } = req.headers;
//   const [bearer, token] = authorization.split(" ");
//   if (bearer !== "Bearer") {
//     next(HttpError(401));
//   }
//   try {
//     const { id } = jwt.verify(token, SECRET_KEY);
//     const user = await User.findById(id);
//     if (!user || !user.token || user.token !== token) {
//       next(HttpError(401));
//     }
//     req.user = user;
//     next();
//   } catch {
//     next(HttpError(401));
//   }
// };

const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;
