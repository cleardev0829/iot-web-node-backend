require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
// app.use(jwt());
// api routes
app.use("/users", require("./users/users.controller"));
app.use("/servicers", require("./servicers/servicer.controller"));
app.use("/products", require("./products/products.controller"));
app.use("/messages", require("./messages/messages.controller"));
app.use("/files", require("./files/file.controller"));
app.use("/notes", require("./notes/note.controller"));
app.use("/folders", require("./folders/folder.controller"));
app.use("/email", require("./email/email.controller"));
app.use("/azure", require("./azure/azure.controller"));

// global error handler
app.use(errorHandler);

// start server
// const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const port = process.env.PORT || 8080;

const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});
