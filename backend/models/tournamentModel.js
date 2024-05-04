const mongoose = require("mongoose")

const tournamentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    tournamentName: {
        type: String,
        required: [true, "Please enter the tournament name"]
    },
    country: {
        type: String,
        required: [true, "Please enter the country"]
    },
    city: {
        type: String,
        required: [true, "Please enter the city"]
    },
    startDate: {
        type: Date,
        required: [true, "Please enter the start date"]
    },
    registrationEnd: {
        type: Date,
        required: [true, "Please enter the registration end date"]
    }
},  {
    timestamps: true
});
module.exports = mongoose.model("Tournament", tournamentSchema);