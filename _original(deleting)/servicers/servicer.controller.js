const express = require('express');
const router = express.Router();
const servicerService = require('./servicer.service');

// routes
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/deleteByIds', _deleteByIds);

module.exports = router;

function register(req, res, next) { 
    servicerService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    servicerService.getAll()
        .then(servicers => res.json(servicers))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    servicerService.getById(req.servicer.sub)
        .then(servicer => servicer ? res.json(servicer) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) { 
    servicerService.getById(req.params.id)
        .then(servicer => servicer ? res.json(servicer) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    servicerService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    servicerService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteByIds(req, res, next) {
    servicerService.deleteByIds(req.body.ids)
        .then(() => res.json({}))
        .catch(err => next(err));
}