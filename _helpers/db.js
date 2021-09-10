const config = require('../config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Servicer: require('../servicers/servicer.model'),
    Product: require('../products/product.model'),
    File: require('../files/file.model'),
    Note: require('../notes/note.model'),
    Message: require('../messages/message.model'),
};