const mongoose = require("mongoose")

const athleteSchema = mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Tournament"
    },
    athleteName: {
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
    bornDate: {
        type: Date,
        required: [true, "Please enter the born date"]
    },
    gender: {
        type: Boolean,
        required: [true, "Please enter the gender"]
    },
    weightDivision: {
        type: String,
        default: "Not registered by weight division"
    }
},  {
    timestamps: true
});
module.exports = mongoose.model("Athlete", athleteSchema);