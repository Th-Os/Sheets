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

// TODO: check submissions delete
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

submissionSchema.methods.populateObj = function() {
    return new Promise((resolve, reject) => {
        let promises = [];
        promises.push(mongoose.model('Student').findById(this.student).then((student) => {
            this.student = student;
        }));
        promises.push(mongoose.model('Answer').find().where('_id').in(this.answers).exec().then((answers) => {
            if (!(answers instanceof Array)) answers = [answers];
            this.answers = answers;
        }));
        promises.push(mongoose.model('User').findById(this.user).then((user) => {
            this.user = user;
        }));
        Promise.all(promises).then(() => resolve()).catch((err) => reject(err));
    });
};

submissionSchema.methods.hasPassed = function(requiredPoints) {
    return new Promise((resolve, reject) => {
        mongoose.model('Answer').find().where('_id').in(this.answers).exec((err, docs) => {
            if (err) reject(err);
            let points = 0;
            for (let doc of docs) {
                points += doc.achieved_points;
            }
            if (points >= requiredPoints) resolve(true);
            else resolve(false);
        });
    });
};

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

answerSchema.methods.populateObj = function() {
    return mongoose.model('Task').findById(this.task).then((task) => {
        this.task = task;
    });
};

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

export let Submission = mongoose.model('Submission', submissionSchema);
export let Answer = mongoose.model('Answer', answerSchema);
export let Student = mongoose.model('Student', studentSchema);
