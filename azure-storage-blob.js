// import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
const storage = require("@azure/storage-blob");

const sasToken =
  process.env.storagesastoken ||
  "sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupix&se=2022-12-31T13:10:11Z&st=2022-01-31T05:10:11Z&spr=https&sig=CHgfCT%2FZpJQXb%2F%2B1s0xuiWVkQW7VP78eFFeIPtCXw8Q%3D"; // Fill string with your SAS token

const storageAccountName =
  process.env.storageresourcename || "rocketiotparserstorage"; // Fill string with your Storage resource name

// Feature flag - disable storage feature to app if not configured
const isStorageConfigured = () => {
  return !storageAccountName || !sasToken ? false : true;
};

// return list of blobs in container to display
async function getBlobsInContainer(containerName) {
  console.log("getBlobsInContainer params", containerName);
  const returnedBlobUrls = [];
  const blobList = [];

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new storage.BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  // get Container - full public read access
  const containerClient = blobService.getContainerClient(containerName);

  // get list of blobs in container
  // eslint-disable-next-line
  let index = 0;
  for await (const blob of containerClient.listBlobsFlat()) {
    index++;

    // if image is public, just construct URL
    const blobUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`;
    returnedBlobUrls.push(blobUrl);

    blobList.push({
      id: index,
      name: blob.name,
      blobUrl: blobUrl,
      url: blobUrl,
      contentType: blob.properties.contentType,
      contentLength: blob.properties.contentLength,
    });
  }

  return await blobList;
}

module.exports = { getBlobsInContainer };
