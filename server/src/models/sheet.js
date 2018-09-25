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
    persistent: {
        type: Boolean,
        default: false
    },
    template: {
        flag: {
            type: Boolean,
            default: false
        },
        points: {
            type: Number,
            default: 0
        }
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
    mongoose.model('Course').find({sheets: doc._id}).exec((err, courses) => {
        if (err) throw err;
        let course = (courses instanceof Array) ? courses[0] : courses;
        course.sheets = course.sheets.filter(e => !(e.equals(doc._id)));
        course.save();
        let promises = [];
        for (let sheetId of course.sheets) {
            promises.push(mongoose.model('Sheet').findById(sheetId).exec()
                .then((sheet) => {
                    if (sheet.order > doc.order) {
                        sheet.order -= 1;
                        sheet.save();
                    }
                }));
        }
        Promise.all(promises).then(() => console.log('saved all other sheets'));
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

// TODO: Test
sheetSchema.methods.getMaxPoints = function() {
    return new Promise((resolve, reject) => {
        mongoose.model('Exercise').find().where('_id').in(this.exercises).exec((err, docs) => {
            if (err) throw err;
            let points = 0;
            let promises = [];
            for (let doc of docs) {
                let promise = doc.getMaxPoints();
                promise.then((res) => {
                    points += res;
                });
                promises.append(promise);
            }
            Promise.all(promises).then(() => {
                resolve(points);
            }).catch((err) => reject(err));
        });
    });
};

sheetSchema.methods.populateObj = function() {
    return new Promise((resolve, reject) => {
        let promises = [];
        promises.push(mongoose.model('Exercise').find().where('_id').in(this.exercises).exec().then((docs) => {
            this.exercises = docs;
        }).catch((err) => { throw err; }));
        promises.push(mongoose.model('Submission').find().where('_id').in(this.submissions).exec().then((docs) => {
            this.submissions = docs;
        }).catch((err) => { throw err; }));
        Promise.all(promises).then(() => resolve()).catch((err) => reject(err));
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
    mongoose.model('Sheet').find({exercises: doc._id}).exec((err, sheets) => {
        if (err) throw err;
        for (let sheet of sheets) {
            sheet.exercises = sheet.exercises.filter(e => !(e.equals(doc._id)));
            sheet.save();
            let promises = [];
            for (let exerciseId of sheet.exercises) {
                promises.push(mongoose.model('Exercise').findById(exerciseId).exec()
                    .then((exercise) => {
                        if (exercise.order > doc.order) {
                            exercise.order -= 1;
                            exercise.save();
                        }
                    }));
            }
            Promise.all(promises).then(() => console.log('saved all other exercises'));
        }
    });
});

exerciseSchema.methods.setPersistence = function(isPersistent, callback) {
    this.persistent = isPersistent;
    this.save(callback);
};

exerciseSchema.methods.getMaxPoints = function() {
    return new Promise((resolve, reject) => {
        mongoose.model('Task').find().where('_id').in(this.tasks).exec((err, docs) => {
            if (err) reject(err);
            let points = 0;
            for (let doc of docs) {
                points += doc.points;
            }
            resolve(points);
        });
    });
};

exerciseSchema.methods.populateObj = function() {
    return new Promise((resolve, reject) => {
        let promises = [];
        promises.push(mongoose.model('Task').find().where('_id').in(this.tasks).exec().then((docs) => {
            this.tasks = docs;
        }).catch((err) => { throw err; }));
        Promise.all(promises).then(() => resolve()).catch((err) => reject(err));
    });
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
    mongoose.model('Solution').findById(doc.solution, (err, solution) => {
        if (err) throw err;
        if (solution !== null) solution.remove();
    });
    mongoose.model('Exercise').find({tasks: doc._id}).exec((err, exercises) => {
        if (err) throw err;
        for (let exercise of exercises) {
            exercise.tasks = exercise.tasks.filter(e => !(e.equals(doc._id)));
            exercise.save();
            let promises = [];
            for (let taskId of exercise.tasks) {
                promises.push(mongoose.model('Task').findById(taskId).exec()
                    .then((task) => {
                        if (task.order > doc.order) {
                            task.order -= 1;
                            task.save();
                        }
                    }).catch((err) => console.error(err)));
            }
            Promise.all(promises).then(() => console.log('saved all other tasks'));
        }
    });
});

// TODO: Test
taskSchema.methods.getExercise = function() {
    return mongoose.model('Exercise').find().where('tasks').in(this._id);
};

taskSchema.methods.populateObj = function() {
    return new Promise((resolve, reject) => {
        let promises = [];
        promises.push(mongoose.model('Solution').findById(this.solution).then((docs) => {
            this.tasks = docs;
        }).catch((err) => { throw err; }));
        Promise.all(promises).then(() => resolve()).catch((err) => reject(err));
    });
};

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