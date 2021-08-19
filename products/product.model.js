const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  uid: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  categories: { type: Array },
  location: {
    address: { type: String },
    lat: { type: Number },
    lng: { type: Number },
  },
  createdDate: { type: Date, default: Date.now },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("lift", schema);
