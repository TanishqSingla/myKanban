const mongoose = require("mongoose");
const Lists = require('./Lists');

module.exports = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	lists: [Lists],
});