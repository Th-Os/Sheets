/* global require */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sheetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    submissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Submission',
        required: false
    }],
    submissiondate: {
        type: Date,
        required: true
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
        required: false
    }],
    min_req_points: {
        type: Number,
        required: true
    },
    order: {
        type: Number,
        default: 0
    },
    perstistent: {
        type: Boolean,
        default: false
    }
});

sheetSchema.post('remove', (doc) => {
    mongoose.model('Exercise').find().where('_id').in(doc.exercises).exec((err, docs) => {
        if (err) throw err;
        for (let doc of docs) {
            if (!doc.perstistent) doc.remove();
        }
    });
    mongoose.model('Submission').find().where('_id').in(doc.submissions).exec((err, docs) => {
        if (err) throw err;
        for (let doc of docs) {
            doc.remove();
        }
    });
});

sheetSchema.methods.setPersistence = function(isPersistent, callback) {
    this.persistent = isPersistent;
    mongoose.model('Exercise').find().where('_id').in(this.exercises).exec((err, docs) => {
        if (err) throw err;
        for (let doc of docs) {
            doc.persistent = isPersistent;
            doc.save();
        }
        this.save(callback);
    });
};

var exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    }],
    order: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: false
    },
    perstistent: {
        type: Boolean,
        default: false
    }
});

exerciseSchema.post('remove', (doc) => {
    mongoose.model('Task').find().where('_id').in(doc.tasks).exec((err, docs) => {
        if (err) throw err;
        for (let doc of docs) {
            doc.remove();
        }
    });
});

exerciseSchema.methods.setPersistence = function(isPersistent, callback) {
    this.persistent = isPersistent;
    this.save(callback);
};

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
        type: Array,
        required: true
    },
    solution: {
        type: Schema.Types.ObjectId,
        ref: 'Solution',
        required: false
    }
});

taskSchema.post('remove', (doc) => {
    mongoose.model('Solution').findById(doc.solution, (err, doc) => {
        if (err) throw err;
        doc.remove();
    });
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
    // if true then auto-correct will give points, if false -> 0
    default_free_text: {
        type: Boolean,
        required: false
    }
});

export var Solution = mongoose.model('Solution', solutionSchema);
export var Sheet = mongoose.model('Sheet', sheetSchema);
export var Exercise = mongoose.model('Exercise', exerciseSchema);
export var Task = mongoose.model('Task', taskSchema);