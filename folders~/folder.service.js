const db = require("../_helpers/db");
const Folder = db.Folder;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  deleteByIds: deleteByIds,
};

async function getAll() {
  return await Folder.find().populate("user");
}

async function getById(id) {
  return await Folder.findById(id);
}

async function create(folderParam) {
  // validate
  // if (await Folder.findOne({ uid: folderParam.uid })) {
  //   throw 'UID "' + folderParam.uid + '" is already taken';
  // }

  if (await Folder.findOne({ name: folderParam.name })) {
    throw 'Name "' + folderParam.name + '" is already taken';
  }
  const folder = new Folder(folderParam);

  // save folder
  await folder.save();
}

async function update(id, folderParam) {
  const folder = await Folder.findById(id);

  // validate
  if (!folder) throw "folder not found";
  if (
    folder.name !== folderParam.name &&
    (await Folder.findOne({ name: folderParam.name }))
  ) {
    throw 'foldername "' + folderParam.name + '" is already taken';
  }

  // copy folderParam properties to folder
  Object.assign(folder, folderParam);

  await folder.save();
}

async function _delete(id) {
  await Folder.findByIdAndRemove(id);
}

async function deleteByIds(ids) {
  ids.map(async (id) => {
    await Folder.findByIdAndRemove(id);
  });
}
