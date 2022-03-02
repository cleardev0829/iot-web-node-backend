const express = require("express");
const router = express.Router();
const azureService = require("./azure.service");

// routes
router.post("/getBlobsInContainer", getBlobsInContainer);
router.get("/deleteBlobInContainer", deleteBlobInContainer);
router.get("/downloadBlobFromContainer", downloadBlobFromContainer);
router.get("/uploadFileToBlob", uploadFileToBlob);
router.get("/deleteContainer", deleteContainer);

module.exports = router;

function getBlobsInContainer(req, res, next) {
  azureService
    .getBlobsInContainer(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}
