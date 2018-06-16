var mongoose = require("mongoose");

var ProcessedSchema = new mongoose.Schema({
    status: Number,
    callNumber: Number,
    sizeOfData: Number,
    city: Object
});

module.exports = mongoose.model('Processed', ProcessedSchema);