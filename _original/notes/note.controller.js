const express = require("express");
const router = express.Router();
const noteService = require("./note.service");

// routes
router.post("/register", register);
router.get("/", getAll);
router.get("/getByMessageId", getByMessageId);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
router.post("/deleteByIds", _deleteByIds);

module.exports = router;

function register(req, res, next) { 
  noteService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  noteService
    .getAll()
    .then((notes) => res.json(notes))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  noteService
    .getById(req.note.sub)
    .then((note) => (note ? res.json(note) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  noteService
    .getById(req.params.id)
    .then((note) => (note ? res.json(note) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getByMessageId(req, res, next) {
  noteService
    .getByMessageId(req.query)
    .then((note) => (note ? res.json(note) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  noteService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  noteService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _deleteByIds(req, res, next) {
  noteService
    .deleteByIds(req.body.ids)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

