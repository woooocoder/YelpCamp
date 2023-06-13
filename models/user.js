const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema
const UserSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    }

})

// Adds a username, password, hash, salt, and ensures usernames are unique
UserSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', UserSchema)