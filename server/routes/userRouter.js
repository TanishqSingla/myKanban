const express = require('express');

const userRouter = express.Router();

userRouter.post("/createUser", (req, res) => {
	console.log("CREATEUSER: ", req.body);
	res.sendStatus(200);
});

module.exports = userRouter;
