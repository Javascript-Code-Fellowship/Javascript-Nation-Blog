'use strict';
const HttpError = require("../error-handlers/http-error")


module.exports = (capability) => {
  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) {
        next()
      } else {
        next('error')
        return next(new HttpError("Invalid credentials", 401))
      }
    } catch (e) {
      next('error')
      return next(new HttpError("Invalid credentials", 401))
    }
  }
}

