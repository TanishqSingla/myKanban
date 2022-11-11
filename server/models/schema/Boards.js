const mongoose = require("mongoose");
const v4 = require('uuid').v4;

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
