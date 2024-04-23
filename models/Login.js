const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            unique: true,
            required: [true, "Please provide an phone numbers"],
            unique: true,
        },
        email: {
            type: String,
            match: [
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              "Please provide a valid email",
            ], // Adding validation for email
          },
        otp: {
            type: String,
            length: 4
        },
        verified: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

// Middleware before saving a document
LoginSchema.pre("save", async function (next) {
    this.otp = Math.floor(Math.random() * 9000) + 1000;
    next();
});

// Assign a "matchOtp" function to the "methods" object of our "UserSchema"
LoginSchema.methods.matchOtp = async function (otp) {
    return otp===this.otp;
};

const Login = mongoose.model("Login", LoginSchema);
module.exports = Login;


