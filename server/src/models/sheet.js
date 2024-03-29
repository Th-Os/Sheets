/**
 * @module models/sheet
 */

/**
 * @overview The definition of the schemas and models of sheet, exercise, task and solution.
 * @author Thomas Oswald and Johannes Dengler
 */

import mongoose from 'mongoose';
import log from './../utils/log';

const Schema = mongoose.Schema;

/**
 * @class
 * @name Schema: Sheet
 * @property {string} name - required
 * @property {Array.<Submission>} submissions - optional
 * @property {Date} submissiondate - required
 * @property {Array.<Exercise>} exercises - optional
 * @property {number} min_req_points - required, Minimal amount of points to pass the sheet.
 * @property {number} order - default: 0
 * @property {boolean} persistent - default: false
 * @property {object} template
 * @property {boolean} template.flag - default: false
 * @property {boolean} template.correctly - default: true
 * @property {number} template.points - default: 0
 */
const sheetSchema = new mongoose.Schema({
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
        correctly: {
            type: Boolean,
            default: true
        },
        points: {
            type: Number,
            default: 0
        }
    }
});

/**
 * On sheet removal exercises, submissions and the reference in the course are deleted.
 */
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
        if (course === undefined) return Error('No course found');
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
        Promise.all(promises).then(() => log.info('saved all other sheets'));
    });
});

/**
 * @class
 * @name Schema: Exercise
 * @property {string} name - required
 * @property {string} description - required
 * @property {Array.<Task>} tasks - required
 * @property {number} order - required
 * @property {boolean} persistent - default: false
 */
const exerciseSchema = new mongoose.Schema({
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

/**
 * On exercise removal tasks and reference in sheet are deleted.
 */
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
            Promise.all(promises).then(() => log.info('saved all other exercises'));
        }
    });
});

/**
 * @class
 * @name Schema: Task
 * @property {string} question - required
 * @property {number} points - required
 * @property {number} order - required
 * @property {Array.<string>} choices - required
 * @property {Solution} solution - optional
*/
const taskSchema = new mongoose.Schema({
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

/**
 * On task removal solution and reference in exercise are deleted.
 */
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
                    }).catch((err) => log.error(err)));
            }
            Promise.all(promises).then(() => log.info('saved all other tasks'));
        }
    });
});

/**
 * @class
 * @name Schema: Solution
 * @property {string} type - required
 * @property {string} regex - optional
 * @property {object} range - optional
 * @property {number} range.from - optional
 * @property {number} range.to - optional
 * @property {number} number - optional
 * @property {string} hint - optional
 * @property {boolean} default_free_text - optional, if true then auto-correct will give points, if false -> 0
*/
const solutionSchema = new mongoose.Schema({
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

export let Solution = mongoose.model('Solution', solutionSchema);
export let Sheet = mongoose.model('Sheet', sheetSchema);
export let Exercise = mongoose.model('Exercise', exerciseSchema);
export let Task = mongoose.model('Task', taskSchema);