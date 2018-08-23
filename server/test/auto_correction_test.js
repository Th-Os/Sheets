/* eslint-env mocha */
import * as db from '../src/database/db';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import mongoose from 'mongoose';
import * as correction from '../src/correction/correction';
import {
    Submission,
    Answer,
    Student
} from '../src/models/submission';
import {
    Task,
    Solution
} from '../src/models/sheet';

chai.use(chaiAsPromised);

const numberAnswer = new Answer({
    text: '2',
    task: new Task({
        question: 'number task',
        points: 10,
        order: 1,
        choices: 'no',
        solution: new Solution({
            type: 'number',
            number: 3
        })
    })
});

const numberTask = numberAnswer.task;
const numberSolution = numberTask.solution;

const rangeAnswer = new Answer({
    text: '4.2132',
    task: new Task({
        question: 'range task',
        points: 10,
        order: 2,
        choices: 'no',
        solution: new Solution({
            type: 'range',
            range: {
                from: '3.9',
                to: '4.1'
            }
        })
    })
});

const rangeTask = rangeAnswer.task;
const rangeSolution = rangeTask.solution;

const regexAnswer = new Answer({
    text: 'hallo Auto, wie gehts?',
    task: new Task({
        question: 'regex task',
        points: 10,
        order: 3,
        choices: 'no',
        solution: new Solution({
            type: 'regex',
            regex: 'Automat\w*'
        })
    })
});

const regexTask = regexAnswer.task;
const regexSolution = regexTask.solution;

const noneAnswer = new Answer({
    text: 'Freitext',
    task: new Task({
        question: 'free text task',
        points: 10,
        order: 4,
        choices: 'no',
        solution: new Solution({
            type: 'freetext',
            default_free_text: false
        })
    })
});

const noneTask = noneAnswer.task;
const noneSolution = noneTask.solution;

const submission = new Submission({
    student: new Student({
        name: 'bla',
        mat_nr: 123
    }),
    answers: []
});

(function () {
    /*
    describe('Auto Correction with Database Tests', function() {
        let sub;
        let answers;
        let subId;
        before(function(done) {
            db.connect(function() {
                done();
            });
        });
        it('init number', function(done) {
            numberSolution.save().then((doc) => {
                numberTask.solution = doc._id;
                numberTask.save().then((doc) => {
                    numberAnswer.task = doc._id;
                });
                done();
            });
        });
        it('init range', function(done) {
            rangeSolution.save().then((doc) => {
                rangeTask.solution = doc._id;
                rangeTask.save().then((doc) => {
                    rangeAnswer.task = doc._id;
                });
                done();
            });
        });
        it('init regex', function(done) {
            regexSolution.save().then((doc) => {
                regexTask.solution = doc._id;
                regexTask.save().then((doc) => {
                    regexAnswer.task = doc._id;
                });
                done();
            });
        });
        it('init none', function(done) {
            noneSolution.save().then((doc) => {
                noneTask.solution = doc._id;
                noneTask.save().then((doc) => {
                    noneAnswer.task = doc._id;
                });
                done();
            });
        });
        // submission save then use answers of submission
        it('init submission', function(done) {
            submission.answers.push(numberAnswer, rangeAnswer, regexAnswer, noneAnswer);
            submission.markModified('answers');
            Answer.insertMany(submission.answers, function(err, docs) {
                if (err) throw err;
                let ids = [];
                for (let doc in docs) {
                    ids.push(doc._id);
                }
                submission.save(function(err) {
                    if (err) throw err;
                    subId = submission._id;
                    done();
                });
            });
        });
        it('get submission from database', function(done) {
            Submission.findOne({_id: subId}).populate({ path: 'answers.answer', populate: { path: 'task', populate: { path: 'solution' } } }).exec(function(err, submission) {
                if (err) throw err;
                sub = submission;
                console.log(sub);
                done();
            });
        });
        it('get answers', function(done) {
            Answer.find({
                '_id': {$in: sub.answers}
            }, function(err, docs) {
                if (err) throw err;
                answers = docs;
                done();
            });
        });

        it('correction is executed', function(done) {
            correction.beginCorrection(answers, function(err) {
                console.log('correction ended');
                it('correction has no error', function(done) {
                    chai.assert.notExists(err);
                    // chai.assert.instanceOf(error, Error, 'Error');
                    done();
                });
                done();
            });
        });

        it('answers are corrected', function(done) {
            Answer.find({
                '_id': {$in: sub.answers}
            }, function(err, docs) {
                if (err) throw err;
                answers = docs;
                for (let answer of answers) {
                    it('answer was auto-corrected', function() {
                        chai.assert.exists(answer.auto_corrected);
                        chai.assert.isTrue(answer.auto_corrected);
                    });
                    it('right amount of points were given', function() {
                        chai.assert.exists(answer.auto_corrected);
                        chai.assert.strictEqual(answer.points, 10);
                    });
                }
                done();
            });

            // TODO: delete tasks and solutions
            after('delete submission', function(done) {
                Submission.findOneAndRemove({ _id: subId }, function(err, doc) {
                    if (err) throw (err);
                    doc.remove().then(() => {
                        for (doc of [numberSolution, rangeSolution, regexSolution, noneSolution, numberTask, rangeTask, regexTask, noneTask]) {
                            doc.remove();
                        }
                        db.disconnect();
                        done();
                    });
                });
            });
        });
    });
    */

    submission.answers.push(numberAnswer, rangeAnswer, regexAnswer, noneAnswer);
    let errors;
    it('correction is running', function (done) {
        correction.beginCorrection(submission.answers, function (err) {
            errors = err;
            done();
        });
    });
    it('correction correct', function () {
        // no errors
        // chai.expect(errors).to.have.lengthOf(0);

        // all errors
        chai.expect(errors).to.be.an('array');
        for (let error of errors) {
            chai.expect(error).to.be.an.instanceOf(Error);
        }
    });
})();