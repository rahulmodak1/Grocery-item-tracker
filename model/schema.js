const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    groceryItem: {
        required: true,
        type: String
    },
    isPurchased: {
        required: true,
        type: Boolean
    }
})
module.exports = mongoose.model('grocery ', Schema);