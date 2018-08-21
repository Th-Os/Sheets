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
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer',
        required: true
    }]
});

submissionSchema.pre('find', function(next) {
    this.populate({
        path: 'answers',
        model: 'Answer'
    });
    next();
});

submissionSchema.pre('remove', function(next) {
    Answer.deleteMany({'_id': {$in: this.answers}}, function(err, res) {
        if (err) throw err;
        next();
    });
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
    auto_corrected: {
        type: Boolean,
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

answerSchema.pre('find', function(next) {
    console.log('GETTING TASK');
    this.populate({
        path: 'task',
        model: 'Task'
    });
    next();
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

export var Submission = mongoose.model('Submission', submissionSchema);
export var Answer = mongoose.model('Answer', answerSchema);
export var Student = mongoose.model('Student', studentSchema);
