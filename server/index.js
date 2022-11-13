const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dbURL = "mongodb://127.0.0.1:27017/myKanban";

const userRouter = require("./routes/userRouter");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use("/api/user", userRouter);

mongoose
	.connect(dbURL)
	.then(() => console.log("db connected"))
	.catch((e) => console.log(e));

app.listen(4000, () =>
	console.log("server running on port http://localhost:4000")
);
