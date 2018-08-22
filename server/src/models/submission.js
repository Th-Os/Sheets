import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const submissionSchema = new mongoose.Schema({
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

submissionSchema.pre('remove', function(next) {
    let answers = this.answers;
    Answer.find({
        '_id': {$in: answers}
    }, function(err, docs) {
        if (err) throw err;
        for (let doc of docs) {
            doc.remove();
        }
        Answer.remove({ '_id': { $in: answers } }, function(err, res) {
            if (err) throw err;
            next();
        });
    });
});

const answerSchema = new mongoose.Schema({
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
    this.populate({
        path: 'task',
        model: 'Task'
    });
    next();
});

answerSchema.pre('remove', function(next) {
    // do something before deletion of answer.
    next();
});

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mat_nr: {
        type: Number,
        required: true
    }
});

export let Submission = mongoose.model('Submission', submissionSchema);
export let Answer = mongoose.model('Answer', answerSchema);
export let Student = mongoose.model('Student', studentSchema);
