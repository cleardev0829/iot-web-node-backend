const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  id: { type: ObjectId, unique: true },
  messageId: { type: ObjectId, required: true, ref: "event" },
  note: { type: String },
  title: { type: String },
  urls: { type: Array },
  createdDate: { type: Date, default: Date.now },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("note", schema);
