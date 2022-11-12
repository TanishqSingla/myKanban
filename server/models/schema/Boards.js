const mongoose = require("mongoose");
const v4 = require("uuid").v4;
const Lists = require('./Lists');

module.exports = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	lists: [Lists],
});