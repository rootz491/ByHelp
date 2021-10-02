const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hash: {
        type: String,
        required: true,
        select: false   //  exclude this field from normal querying
    },                  /*  only include by projection -> Query.selet("+hash") */
    salt: {
        type: String,
        required: true,
        select: false
    },
    type: {
        type: String,   //  employee / employer / admin
        required: true,
        default: "employee"
    }
})

mongoose.models = {};

var User = mongoose.model("User", userSchema);

module.exports = User;