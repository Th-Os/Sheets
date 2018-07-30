/* global require */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submissionSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    answer: {
        type: Schema.Types.ObjectId,
        ref: 'Answer',
        required: true
    }
});

var answerSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    feedback: {
        type: String,
        required: false
    },
    corrected: {
        type: Boolean,
        required: false
    },
    help: {
        type: Boolean,
        required: false
    },
    achieved_points: {
        type: Number,
        required: false
    }
});

var studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mat_nr: {
        type: Number,
        required: true
    }
});

mongoose.model('Submission', submissionSchema);
mongoose.model('Answer', answerSchema);
mongoose.model('Student', studentSchema);