const express = require('express');
const router = express.Router();
const fileService = require('./file.service');

router.post("/upload", uploadFile);

module.exports = router;

function uploadFile(req, res, next) { 
  fileService.uploadFile(req, res)
      .then(() => res.json({}))
      .catch(err => next(err));
}
