const express = require('express');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.listen(4000, () =>
	console.log("server running on port http://localhost:4000")
);
