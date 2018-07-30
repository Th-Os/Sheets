/* global require */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    faculty: {type: String, required: true},
    semester: {type: String, required: true},
    min_req_sheets: {type: Number, required: true},
    sheets: {type: Schema.Types.ObjectId, ref: 'Sheet', required: false}
});

mongoose.model('Course', courseSchema);