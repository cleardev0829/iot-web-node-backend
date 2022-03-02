const express = require("express");
const router = express.Router();
const folderService = require("./folder.service");
const blob = require("../azure-storage-blob");

// routes
router.post("/register", register);
router.get("/", getAll);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
router.post("/deleteByIds", _deleteByIds);

module.exports = router;

function register(req, res, next) {
  folderService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  // blob.getBlobsInContainer("tableau-mt42");
  folderService
    .getAll()
    .then((folders) => res.json(folders))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  folderService
    .getById(req.folder.sub)
    .then((folder) => (folder ? res.json(folder) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  folderService
    .getById(req.params.id)
    .then((folder) => (folder ? res.json(folder) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  folderService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  folderService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _deleteByIds(req, res, next) {
  folderService
    .deleteByIds(req.body.ids)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
