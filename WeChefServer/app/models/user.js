let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let user = new Schema({
    userName: {
        type: String,
        required: [ true, 'User name must be provided.', ],
    },
    facebookID: {
        type: String,
        required: [ true, 'FacebookID must be provided.', ],
        unique: true,
    },
    email: {
        type: String,
        unique: [ true, 'This email address has already been registered.', ],
        sparse: true,
        trim: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
        unique: true,
        required: [ true, 'User profile image url must be provided.', ],
    },
    userImageID: {
        type: String,
        unique: true,
        sparse: true,
        default: null,
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
});


if (!user.options.toObject) {
    user.options.toObject = {};
}

user.options.toObject.transform = (doc, ret, options) => {

    delete ret.facebookID;
    delete ret.__v;
    return ret;
};

if (!user.options.toJSON) {
    user.options.toJSON = {};
}

user.options.toJSON.transform = (doc, ret, options) => {

    delete ret.facebookID;
    delete ret.__v;
    return ret;
};

module.exports = mongoose.model('User', user);