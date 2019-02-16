let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    userName: {
        type: String,
        required: [ true, 'User name must be provided.', ],
    },
    email: {
        type: String,
        unique: [ true, 'This email address has already been registered.', ],
        sparse: true,
    },
    age: {
        type: Number,
        validate: { validator: Number.isInteger, },
        min: [ 1, 'Age must not be negative.', ],
    },
    gender: {
        type: String,
        enum: [ 'male', 'female', 'other', ],
    },
    userImageURL: {
        type: String,
        default: 'null', // save a default image in cloudinary
    },
    userImageID: {
        type: String,
        unique: true,
        sparse: true,
    },
    favoriteRecipeIDs: [ {
        type: ObjectId,
        ref: 'recipe',
    }, ],
    shoppingListRecipeIDs: [ {
        type: ObjectId,
        ref: 'recipe',
    }, ],
    myRecipeIDs: [ {
        type: ObjectId,
        ref: 'recipe',
    }, ],
}));