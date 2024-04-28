const { model, Schema } = require('mongoose');

const BookModel = model('user', Schema({
    
    "title": {
        type: String,
        required: true
    },
    "author": {
        type: String,
        required: true
    },
    "publicationYear": {
        type: Date,
        required: true
    },
    
    
}))

module.exports = { BookModel };