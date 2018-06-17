var mongoose = require("mongoose");

var ProcessedSchema = new mongoose.Schema({
    city: Object,
    max_temp: Number,
    call: String
});

module.exports = mongoose.model('Processed', ProcessedSchema);