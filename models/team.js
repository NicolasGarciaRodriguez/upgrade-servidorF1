const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema ({
    name: { type: String, required: true },
    powerUnit: { type: String, required: true },
    worldTitles: { type: Number, required: true },
    drivers: [{ type: mongoose.Types.ObjectId, ref: "Driver" }],
}, {
    timestamps: true,
})

const Team = mongoose.model("Team", teamSchema);

module.exports = Team