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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipe',
        required: true,
    },
    qOwnerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
}));