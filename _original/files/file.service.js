const db = require("../_helpers/db");
const File = db.File;

module.exports = {
  getAll,
  getById,
  getByLiftId,
  create,
  update,
  delete: _delete,
  deleteByIds: deleteByIds,
};

async function getAll() {
  return await File.find();
}

async function getById(id) {
  return await File.findById(id);
}

async function getByLiftId(fileParam) {
  return await File.find({ liftId: fileParam.liftId }).populate("liftId");
}

async function create(fileParam) {
  // validate
  if (await File.findOne({ url: fileParam.uid })) {
    throw 'ID "' + fileParam.uid + '" is already taken';
  }

  const file = new File(fileParam);

  // save file
  await file.save();
}

async function update(id, fileParam) {
  const file = await File.findById(id);

  // validate
  if (!file) throw "file not found";
  if (
    file.name !== fileParam.name &&
    (await File.findOne({ name: fileParam.name }))
  ) {
    throw 'filename "' + fileParam.name + '" is already taken';
  }

  // copy fileParam properties to file
  Object.assign(file, fileParam);

  await file.save();
}

async function _delete(id) {
  if (id === "all") await File.remove();
  else await File.findByIdAndRemove(id);
}

async function deleteByIds(ids) {
  ids.map(async (id) => {
    await File.findByIdAndRemove(id);
  });
}
