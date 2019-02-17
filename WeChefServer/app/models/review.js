let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('Review', new Schema({
    content: {
        type: String,
    },
    reviewImageURL: {
        type: String,
        default: 'null', // save a default image in cloudinary
        required: true,
    },
    reviewImageID: {
        type: String,
        unique: true,
        sparse: true,
        required: true,    
    },
    reviewRecipeIDs: {
        type: ObjectId,
        ref: 'recipe',
        required: true,
    },
    reviewOwnerID: {
        type: ObjectId,
        ref: 'user',
        required: true,
    },
}));