const db = require("../_helpers/db");
const Note = db.Note;

module.exports = {
  getAll,
  getById,
  getByMessageId,
  create,
  update,
  delete: _delete,
  deleteByIds: deleteByIds,
};

async function getAll() {
  return await Note.find();
}

async function getById(id) {
  return await Note.findById(id);
}

async function getByMessageId(noteParam) {
  return await Note.find({ messageId: noteParam.messageId }).populate("messageId");
}

async function create(noteParam) {
  // validate
  // if (await Note.findOne({ url: noteParam.uid })) {
  //   throw 'ID "' + noteParam.uid + '" is already taken';
  // }

  const note = new Note(noteParam);

  // save note
  await note.save();
}

async function update(id, noteParam) {
  const note = await Note.findById(id);

  // validate
  if (!note) throw "note not found";
  if (
    note.name !== noteParam.name &&
    (await Note.findOne({ name: noteParam.name }))
  ) {
    throw 'notename "' + noteParam.name + '" is already taken';
  }

  // copy noteParam properties to note
  Object.assign(note, noteParam);

  await note.save();
}

async function _delete(id) {
  if (id === "all") await Note.remove();
  else await Note.findByIdAndRemove(id);
}

async function deleteByIds(ids) {
  ids.map(async (id) => {
    await Note.findByIdAndRemove(id);
  });
}
