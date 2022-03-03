const storage = require("@azure/storage-blob");

const sasToken =
  process.env.storagesastoken ||
  "sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupix&se=2022-12-31T13:10:11Z&st=2022-01-31T05:10:11Z&spr=https&sig=CHgfCT%2FZpJQXb%2F%2B1s0xuiWVkQW7VP78eFFeIPtCXw8Q%3D";

const storageAccountName =
  process.env.storageresourcename || "rocketiotparserstorage";

const isStorageConfigured = () => {
  return !storageAccountName || !sasToken ? false : true;
};

const storageUrl = `https://${storageAccountName}.blob.core.windows.net`;

const blobServiceClient = new storage.BlobServiceClient(
  `${storageUrl}/?${sasToken}`
);

const getBlobsInContainer = async ({ containerName }) => {
  const returnedBlobUrls = [];
  const blobList = [];

  const containerClient = blobServiceClient.getContainerClient(containerName);

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

const deleteBlobInContainer = async ({ containerName, fileName }) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  const blobDeleteResponse = await blockBlobClient.delete();

  return await blobDeleteResponse;
};

const downloadBlobInContainer = async ({ containerName, fileName }) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  const blobDownloadResponse = await blockBlobClient.download(0);

  return await blobDownloadResponse;
};

const uploadBlobInContainer = async ({ containerName, file }) => {
  if (!file) return [];

  const containerClient = blobServiceClient.getContainerClient(containerName);
  // await containerClient.createIfNotExists({
  //   access: "container",
  // });
  console.log(file);

  // upload file
  const blobClient = containerClient.getBlockBlobClient(file.name);
  const options = { blobHTTPHeaders: { blobContentType: file.type } };
  const response = await blobClient.uploadBrowserData(file, options);

  const blobUrl = `${storageUrl}/${containerName}/${file.name}`;
  return blobUrl;
};

const createContainerInStorage = async ({ containerName }) => {
  if (!containerName) return [];

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const data = await containerClient.createIfNotExists({
    access: "container",
  });

  return data;
};

const deleteContainerInStorage = async ({ containerName }) => {
  if (!containerName) return [];
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const data = await containerClient.deleteIfExists({
    access: "container",
  });

  return data;
};

const listContainersInStorage = async ({ any }) => {
  const iter = blobServiceClient.listContainers();
  let containerItem = await iter.next();
  let containerList = [];
  while (!containerItem.done) {
    containerList.push(containerItem.value);
    containerItem = await iter.next();
  }

  return containerList;
};

module.exports = {
  getBlobsInContainer,
  deleteBlobInContainer,
  downloadBlobInContainer,
  uploadBlobInContainer,
  createContainerInStorage,
  deleteContainerInStorage,
  listContainersInStorage,
};

// fetch(file.blobUrl).then((response) => {
//   response.blob().then((blob) => {
//     let url = window.URL.createObjectURL(blob);
//     let a = document.createElement("a");
//     a.href = url;
//     a.download = file.name;
//     a.click();
//   });
// });
