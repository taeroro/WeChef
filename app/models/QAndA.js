let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('QAndA', new Schema({
    qContent: {
        type: String,
        required: true,
    },
    aContent: {
        type: String,
    },
    qRecipeIDs: {
        type: ObjectId,
        ref: 'recipe',
        required: true,
    },
    qOwnerID: {
        type: ObjectId,
        ref: 'user',
        required: true,
    },
}));