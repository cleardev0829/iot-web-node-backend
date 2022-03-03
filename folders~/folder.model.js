const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  user: { type: ObjectId, required: true, ref: "user" },
  createdDate: { type: Date, default: Date.now },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("folder", schema);
