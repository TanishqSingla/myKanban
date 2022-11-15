const express = require('express');
const authController = require('../controllers/authController')

const userRouter = express.Router();

userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);
userRouter.get('/logout', authController.logout);
userRouter.get("/authenticated", authController.authenticated)
userRouter.get('/getBoards', authController.getBoards)

module.exports = userRouter;
