const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*      Worker Parameters
*   user        [ref - user]
*   joinedOn    [Date]
*/

const workerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    joinedOn: {
        type: Date,
        default: new Date().getTime()
    }
});

/*      Job Parameters:
*   title   [String]
*   description [String]
*   image   [Buffer]    
*   date    [Date]              -
*   employer    [ref - user]
*   workers [array - worker]    -
*   expectedWorkers [Number]
*   expectedDays    [Number]
*   deadline    [Date]
*   isFullPaid  [Boolean]       -
*   isTokenPaid [Boolean]       -
*   status  [String] -> open/stale/close    -
*   tokenMoney  [Number]    
*   fullMoney   [Number]
*   address {pincode, location}   [Object {Number, String}]
*/

const jobSchema = new Schema({
    title: {
        type: String,
        minlength: 15,
        maxlength: 50,
        immutable: true,
        required: true
    },
    description: {
        type: String,
        minlength: 30,
        maxlength: 150,
        required: true,
        immutable: true
    },
    image: {
        type: Buffer,
        required: false,
        select: false,
    },
	date: {
        type: Date,
        default: new Date().getTime(),
        immutable: true
    },
	employer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true
    },
	workers: [workerSchema],
	expectedWorkers: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
	expectedDays: {
        type: Number,
        min: 1,
        required: true
    },
	deadline: Date,
	isFullPaid: {
        type: Boolean,
        default: false
    },
	isTokenPaid: {
        type: Boolean,
        default: false
    },
	status: {
        type: String,
        default: 'open'
    },
	tokenMoney: {
        type: Number,
        required: true,
        minlength: 0,
    },
	fullMoney: {    // just total money (excluding tokenMoney)
        type: Number,
        required: true,
        minlength: 200,
    },
    address: {
        location: String,
        pincode: Number
    }
});

mongoose.models = {};

var Job = mongoose.model("Job", jobSchema);

module.exports = Job;