const mongoose = require("mongoose");
const { v4 } = require("uuid");
const Boards = require("./Boards");

module.exports = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	boards: [Boards],
});
