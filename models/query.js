const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discussionSchema = new Schema({
    user: { //  reference to user
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    answer: String
});

const querySchema = new Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    by: { //  reference to user
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: new Date().getTime()
    },
    discussions: [discussionSchema],
    resolved: {
        type: Boolean,
        default: false
    }
});

mongoose.models = {};

var Query = mongoose.model("Query", querySchema);

module.exports = Query;