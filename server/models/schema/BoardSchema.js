const mongoose = require("mongoose");
const ListSchema = require('./ListSchema');

module.exports = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	lists: [ListSchema],
});