'use strict';

const base64 = require('base-64');
const { users } = require('../models/index');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) { return _authError(); }
  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');
  console.log(user)
  console.log(pass)
  try {
    console.log('before auth')
    req.user = await users.authenticateBasic(user, pass)
    console.log('after auth')
    next();
  } catch (e) {
    _authError()
  }

  function _authError() {
    res.status(403).send('Invalid Login')
  }
}