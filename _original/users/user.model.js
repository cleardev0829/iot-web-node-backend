const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uuid: { type: String, unique: true, required: true },
    password: { type: String },
    displayName: { type: String },
    email: { type: String, unique: true, require: true },
    phone: { type: String },
    role: { type: String },
    active: { type: Boolean },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('user', schema);