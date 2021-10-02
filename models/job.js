const mongoose = require("mongoose");

var jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    employer: { 
        type: mongoose.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    employees: [{ 
        type: mongoose.Types.ObjectId,
        ref: "User" 
    }],
    date: {
        type: Date,
        default: new Date().getDate()
    }
})

mongoose.models = {};

var Job = mongoose.model("Job", jobSchema);

module.exports = Job;