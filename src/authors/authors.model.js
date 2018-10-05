const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
    {
        firstName: {type: String, required: true, max: 100},
        familyName: {type: String, required: true, max: 100},
        dateOfBirth: { type: Date },
        dateOfDeath: { type: Date }
    }
);


module.exports = mongoose.model('Author', AuthorSchema);