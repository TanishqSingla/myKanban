import express, { Router } from "express";
import userRouter from './routes/userRouter'

const app = express();

app.use('/user', userRouter);

app.listen(4000, () =>
	console.log("server running on port http://localhost:4000")
);
