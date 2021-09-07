const db = require("../_helpers/db");
const Message = db.Message;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = {
  getAll,
  getByDeviceId,
  getById,
  getByPagenation,
  getLastMsgs,
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

async function getByPagenation(messageParam) {
  let con = {};

  if (messageParam.log) {
    if (messageParam.log === "all") {
      con = {
        "message.ID": parseInt(messageParam.deviceId),
        "message.log": { $in: ["error", "info", "alarm"] },
      };
    } else {
      con = {
        "message.ID": parseInt(messageParam.deviceId),
        "message.log": messageParam.log,
      };
    }
  }

  const count = await Message.find({ ...con }).countDocuments();

  return await Message.aggregate([
    {
      $match: {
        ...con,
      },
    },   
    { $addFields: { count: count } },
  ])
    .sort({ _id: -1 })
    .skip(parseInt(messageParam.skip))
    .limit(parseInt(messageParam.limit));
}

async function getLastMsgs(messageParam) {
  return await Message.aggregate([
    {
      $match: {
        "message.log": messageParam.log,
      },
    },
    {
      $group: {
        _id: { ID: "$message.ID" },
        lastId: { $last: "$_id" },
        device: { $last: "$device" },
        message: { $last: "$message" },
        timestamp: { $max: "$timestamp" },
        id: { $last: "$_id" },
      },
    },
  ])
    .sort({ _id: -1 })
    .skip(parseInt(messageParam.skip))
    .limit(parseInt(messageParam.limit));
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
  if (id === "all") await Message.remove();
  else await Message.findByIdAndRemove(id);
}
