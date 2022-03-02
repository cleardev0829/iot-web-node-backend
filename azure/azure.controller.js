const express = require("express");
const router = express.Router();
const azureService = require("./azure.service");

// routes
router.post("/getBlobsInContainer", getBlobsInContainer);
router.post("/deleteBlobInContainer", deleteBlobInContainer);
router.post("/downloadBlobInContainer", downloadBlobInContainer);
router.post("/uploadBlobInContainer", uploadBlobInContainer);
router.post("/createContainerInStorage", createContainerInStorage);
router.post("/deleteContainerInStorage", deleteContainerInStorage);

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

function createContainerInStorage(req, res, next) {
  azureService
    .createContainerInStorage(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function deleteContainerInStorage(req, res, next) {
  azureService
    .deleteContainerInStorage(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}
