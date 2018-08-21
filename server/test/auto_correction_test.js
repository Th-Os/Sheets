/* eslint-env mocha */
import * as db from '../src/database/db';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as correction from '../src/correction/correction';
import {Submission, Answer, Student} from '../src/models/submission';
import {Task, Solution} from '../src/models/sheet';

chai.use(chaiAsPromised).should();

const numberAnswer = new Answer({
    text: '3',
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

const rangeAnswer = new Answer({
    text: '4',
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

const regexAnswer = new Answer({
    text: 'hallo Automatentheorie, wie gehts?',
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

const noneAnswer = new Answer({
    text: 'Freitext',
    task: new Task({
        question: 'free text task',
        points: 10,
        order: 4,
        choices: 'no',
        solution: new Solution({
            type: 'freetext',
            default_free_text: true
        })

    })
});

const submission = new Submission({student: new Student({name: 'bla', mat_nr: 123}),
    answers: []});

(function() {
    let sub;
    let answers;
    let subId;
    describe('Auto Correction with Database Tests', function() {
        // Before starting the test, create a sandboxed database connection
        // Once a connection is established invoke done()
        before(function(done) {
            db.connect(function() {
                done();
            });
        });
        // submission save then use answers of submission
        it('init submission', function(done) {
            submission.answers.push(numberAnswer, rangeAnswer, regexAnswer, noneAnswer);
            submission.markModified('answers');
            Answer.insertMany(submission.answers, function(err, docs) {
                if (err) throw err;
                submission.save(function(err) {
                    if (err) throw err;
                    subId = submission._id;
                    done();
                });
            });
        });
        it('get submission from database', function(done) {
            Submission.findOne({_id: subId}).populate('answers.answer').exec(function(err, submission) {
                if (err) throw err;
                sub = submission;
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

            after('delete submission', function(done) {
                Submission.findOneAndRemove({ _id: subId }, function(err, doc) {
                    if (err) throw (err);
                    doc.remove().then(() => {
                        db.disconnect();
                        done();
                    });
                });
            });
        });
    });

    /*
    testAnswer(numberAnswer);
    testAnswer(rangeAnswer);
    testAnswer(regexAnswer);
    testAnswer(noneAnswer);
    */
    // testAllAnswers(submission);
    // submission delete after execution
})();

/*
it('should begin correction', function(done) {
    correction.beginCorrection(submission.answers).then(() => {
        done();
        it('should find submission', function(done) {
            Submission.findById(subId).then((sub) => {
                done();
                let number = sub.answers[0];
                describe('Answer correction', function() {
                    it('should be auto-corrected', function(done) {
                        chai.assert.isTrue(number.auto_corrected, 'Answer was auto-corrected');
                        done();
                    });
                    it('achieved points should be correct', function(done) {
                        chai.assert.strictEqual(number.achieved_points, 10, 'Achieved points are correct');
                        done();
                    });
                });
            }).catch((err) => { throw err; });
        }).catch((err) => { throw err; });
    });
}); */