/* global require */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sheetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // course: {type: Schema.Types.ObjectId, ref: 'Course'}, // necessary?
    submission: {
        type: Schema.Types.ObjectId,
        ref: 'Submission',
        required: false
    },
    submissiondate: {
        type: Date,
        required: true
    },
    exercise: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
        required: false
    },
    min_req_points: {
        type: Number,
        required: true
    }
});

var exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    order: {
        type: Number,
        required: true
    }
});

var taskSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    choices: {
        type: String,
        required: true
    },
    solution: {
        type: Schema.Types.ObjectId,
        ref: 'Solution',
        required: true
    }
});

var solutionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    regex: {
        type: String,
        required: false
    },
    range: {
        from: {
            type: Number,
            required: false
        },
        to: {
            type: Number,
            required: false
        }
    },
    number: {
        type: Number,
        reuqired: false
    },
    hint: {
        type: String,
        required: false
    },
    default_points: {
        type: Number,
        required: false
    }
});

export var Solution = mongoose.model('Solution', solutionSchema);
export var Sheet = mongoose.model('Sheet', sheetSchema);
export var Exercise = mongoose.model('Exercise', exerciseSchema);
export var Task = mongoose.model('Task', taskSchema);