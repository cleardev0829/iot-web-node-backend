const storage = require("@azure/storage-blob");

const sasToken =
  process.env.storagesastoken ||
  "sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupix&se=2022-12-31T13:10:11Z&st=2022-01-31T05:10:11Z&spr=https&sig=CHgfCT%2FZpJQXb%2F%2B1s0xuiWVkQW7VP78eFFeIPtCXw8Q%3D"; // Fill string with your SAS token

const storageAccountName =
  process.env.storageresourcename || "rocketiotparserstorage";

const isStorageConfigured = () => {
  return !storageAccountName || !sasToken ? false : true;
};

const storageUrl = `https://${storageAccountName}.blob.core.windows.net`;

const blobService = new storage.BlobServiceClient(`${storageUrl}/?${sasToken}`);

const getBlobsInContainer = async (containerName) => {
  const returnedBlobUrls = [];
  const blobList = [];

  const containerClient = blobService.getContainerClient(containerName);

  let index = 0;
  for await (const blob of containerClient.listBlobsFlat()) {
    index++;

    const blobUrl = `${storageUrl}/${containerName}/${blob.name}`;
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
};

const deleteBlobInContainer = async (containerName, fileName) => {
  const containerClient = blobService.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  const blobDeleteResponse = await blockBlobClient.delete();

  return await blobDeleteResponse;
};

const downloadBlobFromContainer = async (containerName, file) => {
  const containerClient = blobService.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(file.name);
  const blobDownloadResponse = await blockBlobClient.download(0);

  fetch(file.blobUrl).then((response) => {
    response.blob().then((blob) => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
    });
  });

  return blobDownloadResponse;
};

const createBlobInContainer = async (containerClient, file) => {
  const blobClient = containerClient.getBlockBlobClient(file.name);
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadBrowserData(file, options);
};

const uploadFileToBlob = async (containerName, file) => {
  if (!file) return [];

  const containerClient = blobService.getContainerClient(containerName);
  await containerClient.createIfNotExists({
    access: "container",
  });

  // upload file
  await createBlobInContainer(containerClient, file);

  const blobUrl = `${storageUrl}/${containerName}/${file.name}`;
  return blobUrl;
};

const deleteContainer = async (containerName) => {
  if (!containerName) return [];

  const containerClient = blobService.getContainerClient(containerName);
  const data = await containerClient.deleteIfExists({
    access: "container",
  });

  return data;
};

module.exports = {
  getBlobsInContainer,
  deleteBlobInContainer,
  downloadBlobFromContainer,
  uploadFileToBlob,
  deleteContainer,
};
