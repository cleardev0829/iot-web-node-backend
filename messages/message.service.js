const db = require("../abc/db");
const Message = db.Message;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = {
  getAll,
  getByDeviceId,
  getById,
  getByLog,
  create,
  createA,
  update,
  delete: _delete,
};

const Event = mongoose.model(
  "Event",
  new Schema(
    { message: {}, index: String },
    { strict: false, collection: "events" }
  )
);

async function getAll() {
  return await Message.find();
}

async function getByDeviceId(messageParam) {
  return Message.find({ "message.ID": messageParam.deviceId });
}

async function getByLog(messageParam) {
  return Message.find({ "message.log": messageParam.log });
}

async function getById(id) {
  return await Message.findById(id);
}

async function create(messageParam) {
  const message = new Message(messageParam);

  // save message
  await message.save();
}

async function createA(messageParam) {
  var message = new Event(messageParam);

  Object.keys(message).forEach((k) => {
    message.markModified(k);
  });

  // save message
  await message.save();
}

async function update(id, messageParam) {
  const message = await Message.findById(id);

  // validate
  if (!message) throw "Message not found";

  // copy messageParam properties to message
  Object.assign(message, messageParam);

  await message.save();
}

async function _delete(id) {
  await Message.findByIdAndRemove(id);
}
