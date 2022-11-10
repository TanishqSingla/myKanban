import mongoose, { Schema } from "mongoose";
import { v4 } from "uuid";

export default mongoose.Schema({
	_id: {
		type: String,
		default: v4(),
	},
	name: {
		type: String,
		required: true,
	},
	lists: [Lists],
});
