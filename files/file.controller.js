const express = require("express");
const router = express.Router();
const fileService = require("./file.service");

// routes
router.post("/register", register);
router.get("/", getAll);
router.get("/getByLiftId", getByLiftId);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
router.post("/deleteByIds", _deleteByIds);
router.post("/deleteAll", _deleteAll);

module.exports = router;

function register(req, res, next) {
  fileService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  fileService
    .getAll()
    .then((files) => res.json(files))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  fileService
    .getById(req.file.sub)
    .then((file) => (file ? res.json(file) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  fileService
    .getById(req.params.id)
    .then((file) => (file ? res.json(file) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getByLiftId(req, res, next) {
  fileService
    .getByLiftId(req.query)
    .then((file) => (file ? res.json(file) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  fileService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  fileService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _deleteByIds(req, res, next) {
  fileService
    .deleteByIds(req.body.ids)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _deleteAll(req, res, next) {
  fileService
    .deleteAll()
    .then(() => res.json({}))
    .catch((err) => next(err));
}
