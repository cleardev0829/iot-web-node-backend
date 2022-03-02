const express = require("express");
const router = express.Router();
const azureService = require("./azure.service");

// routes
router.post("/getBlobsInContainer", getBlobsInContainer);
router.get("/deleteBlobInContainer", deleteBlobInContainer);
router.get("/downloadBlobInContainer", downloadBlobInContainer);
router.get("/uploadBlobInContainer", uploadBlobInContainer);
router.get("/deleteContainerInStorage", deleteContainerInStorage);

module.exports = router;

function getBlobsInContainer(req, res, next) {
  azureService
    .getBlobsInContainer(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function deleteBlobInContainer(req, res, next) {
  azureService
    .deleteBlobInContainer(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function downloadBlobInContainer(req, res, next) {
  azureService
    .downloadBlobInContainer(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function uploadBlobInContainer(req, res, next) {
  azureService
    .uploadBlobInContainer(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function deleteContainerInStorage(req, res, next) {
  azureService
    .deleteContainerInStorage(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}
