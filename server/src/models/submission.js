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
        required: true
    },
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer',
        required: true
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

/**
 * On submission removal answers and reference in sheet are deleted.
 */
submissionSchema.post('remove', function(doc) {
    mongoose.model('Answer').find().where('_id').in(doc.answers).exec((err, docs) => {
        if (err) throw err;
        if (docs === undefined || docs.length === undefined || docs.length === 0) return;
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
        required: false
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

/**
 * On submission removal reference in sheet is deleted.
 */
answerSchema.post('remove', function(doc) {
    mongoose.model('Submission').find({answers: doc._id}).exec((err, submissions) => {
        if (err) throw err;
        if (submissions === undefined || submissions === null) return;
        let submission = (submissions instanceof Array) ? submissions[0] : submissions;
        if (submission === undefined || submission === null) return;
        submission.answers = submission.answers.filter(e => !(e.equals(doc._id)));
        submission.save();
    });
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
    },
    grips_id: {
        type: Number,
        required: false
    },
    status: {
        type: Number,
        required: false
    }
});

/**
 * On student removal reference in submission is deleted.
 */
studentSchema.post('remove', function(doc) {
    mongoose.model('Submission').find({student: doc._id}).exec((err, submissions) => {
        if (err) throw err;
        if (submissions === undefined || submissions === null) return;
        let submission = (submissions instanceof Array) ? submissions[0] : submissions;
        if (submission === undefined || submission === null) return;
        submission.student = null;
        submission.save();
    });
});

export let Submission = mongoose.model('Submission', submissionSchema);
export let Answer = mongoose.model('Answer', answerSchema);
export let Student = mongoose.model('Student', studentSchema);
