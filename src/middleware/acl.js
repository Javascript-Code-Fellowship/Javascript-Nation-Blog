'use strict';
const HttpError = require("../error-handlers/http-error")


module.exports = (capability) => {
  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) {
        next()
      } else {
        return next(new HttpError("Invalid credentials", 401))
      }
    } catch (e) {
      return next(new HttpError("Invalid credentials", 401))
    }
  }
}

