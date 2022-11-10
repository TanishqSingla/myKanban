import { v4 } from "uuid";
import Boards from "./Boards";

export default mongoose.Schema({
	_id: {
		type: String,
		default: v4(),
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	boards: [Boards],
});
