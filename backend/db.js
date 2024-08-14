const mongoose = require("mongoose")
const { Schema } = mongoose

mongoose.connect('mongodb://localhost:2717/paytm')

const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    }
});

const accountSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true
    }
})

const Account = mongoose.model('Account', accountSchema)
const User = mongoose.model('Users', userSchema)

module.exports = {
    User,
    Account
}