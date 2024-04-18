const mongoose = require("mongoose");

const userprofileSchema = new mongoose.Schema({
    phone_number: {
        type: Number,
        required: [true,"Phone number must be provided"],
        unique: true
    },
    email_id: {
        type: String,
    },
    name: {
        type: String
    }
});

const Userprofile = mongoose.model("Userprofile", userprofileSchema);
module.exports = Userprofile;