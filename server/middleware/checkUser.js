const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies?.jwt;
  if(!token) {
    return;
  }
  jwt.verify(token, "my secret", (err, user) => {
    if(err) {
      return;
    } else {
      req.user = user;
      next();
    }
  })
}