const mongoose = require("mongoose");
const Boards = require("./Boards");
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
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

schema.pre('save', async function(next) {
	const salt = await bcrypt.genSalt()
	this.password = await bcrypt.hash(this.password, salt);
	next();
})

module.exports = schema;