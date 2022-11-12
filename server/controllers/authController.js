const user = require('../models/User');

module.exports.signup = (req, res) => {
  res.send("sign up");
}

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("sign in");
}