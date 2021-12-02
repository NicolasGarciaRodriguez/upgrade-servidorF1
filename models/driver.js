const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema ({
    name: { type: String, required: true},
    wins: { type: Number, require: true},
    podiums: { type: Number, required: true},
    worldTitles: { type: Number, required: true},
}, {
    timestamps: true,
})

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;