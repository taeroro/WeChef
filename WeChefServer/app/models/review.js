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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipe',
        required: true,
    },
    reviewOwnerID: {
        type: String,
        required: true,
    },
    quality: {
        type: Number,
    },
}, {
  timestamps: { createdAt: true, updatedAt: true }
}));
