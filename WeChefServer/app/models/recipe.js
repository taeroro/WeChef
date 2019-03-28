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

let recipe = mongoose.model('Recipe', new Schema({
    title: {
        type: String,
        required: [ true, 'Recipe title must be provided.', ],
    },
    ownerID: {
        type: String,
        required: [ true, 'OwnerID must be provided.']
    },
    content: {
        type: [ String ],
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
}, {
  timestamps: { createdAt: true, updatedAt: true }
}));

recipe.index(
    { 
        'title': 'text',
        'content': 'text',
        'ingredients.name': 'text',
    }, {
        'weights': {
            'title': 5,
            'content': 2,
            'ingredients.name': 3,
        }
    },
);

module.exports = recipe;
