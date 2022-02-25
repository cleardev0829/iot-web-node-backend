const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  uid: { type: String, unique: true, required: true },
  liftId: { type: ObjectId, required: true, ref: "lift" },
  name: { type: String, required: true },
  size: { type: Number },
  type: { type: String },
  url: { type: String, unique: true, required: true },
  createdDate: { type: Date, default: Date.now },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("file", schema);
