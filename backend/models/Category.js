const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

let categorySchema = new Schema({
    name: {
        type: String
    },
    created: {
        type: Date
    },
    modified: {
        type: Date
    },
    createdBy: {
        type: ObjectId
    },
    modifiedBy: {
        type: ObjectId
    },
}, {
    collection: 'categories'
})

module.exports = mongoose.model('Category', categorySchema)
