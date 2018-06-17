var mongoose = require("mongoose");

var ProcessedSchema = new mongoose.Schema({
    call: String,
    numCols: String,
    numRows: String,
    cTime: String,
    rTime: String,
    p2Finish: String,
    results: Object
});

module.exports = mongoose.model('Processed', ProcessedSchema);