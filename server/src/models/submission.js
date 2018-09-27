/**
 * @overview The definition of the schemas and models of submission, answer and student.
 * @author Thomas Oswald and Johannes Dengler
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const submissionSchema = new mongoose.Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: false
    },
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer',
        required: false
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    grips_id: {
        type: String,
        required: true
    }
});

submissionSchema.post('remove', function(doc) {
    mongoose.model('Answer').find().where('_id').in(doc.answers).exec((err, docs) => {
        if (err) throw err;
        for (let doc of docs) {
            doc.remove();
        }
    });
    mongoose.model('Sheet').find({submissions: doc._id}).exec((err, sheets) => {
        if (err) throw err;
        if (sheets === undefined || sheets === null) return;
        let sheet = (sheets instanceof Array) ? sheets[0] : sheets;
        if (sheet === undefined || sheet === null) return;
        sheet.submissions = sheet.submissions.filter(e => !(e.equals(doc._id)));
        sheet.save();
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

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },
    mat_nr: {
        type: Number,
        required: true
    }
});

export let Submission = mongoose.model('Submission', submissionSchema);
export let Answer = mongoose.model('Answer', answerSchema);
export let Student = mongoose.model('Student', studentSchema);
