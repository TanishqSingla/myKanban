const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const BoardSchema = require("./BoardSchema");

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
	boards: [BoardSchema],
});

schema.pre('save', async function(next) {
	const salt = await bcrypt.genSalt()
	this.password = await bcrypt.hash(this.password, salt);
	next();
})

module.exports = schema;