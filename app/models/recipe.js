let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ingredient_schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
}, { noId: true, });

module.exports = mongoose.model('Recipe', new Schema({
    title: {
        type: String,
        required: [ true, 'Recipe title must be provided.', ],
    },
    ownderID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [ true, 'OwnerID must be provided.']
    },
    content: {
        type: String,
    },
    recipeImageURL: {
        type: String,
        default: 'null', // save a default image in cloudinary
    },
    recipeImageID: {
        type: String,
        unique: true,
        sparse: true,
    },
    recipeVideoURL: {
        type: String,
        default: 'null', // save a default image in cloudinary
    },
    recipeVideoID: {
        type: String,
        unique: true,
        sparse: true,
    },
    ingredients: [ ingredient_schema, ],
    difficulty: {
        type: Number,
    },
    favoriteCount: {
        type: Number,
        default: 0,
    },
}));