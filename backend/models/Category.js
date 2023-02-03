const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    rollno: {
        type: Number
    }
}, {
    collection: 'categories'
})

module.exports = mongoose.model('Category', categorySchema)
