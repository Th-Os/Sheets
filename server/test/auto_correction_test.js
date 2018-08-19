/* eslint-env mocha */

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
            number: 2
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
    answers: [numberAnswer, rangeAnswer, regexAnswer, noneAnswer]});

function testAnswer(answer) {
    describe('answer correction of: ' + answer.task.question, function() {
        let error;
        it('correction is executed', function(done) {
            correction.beginCorrection([answer], function(err) {
                error = err;
                done();
            });
        });

        it('correction has error', function() {
            chai.assert.exists(error);
            chai.assert.instanceOf(error, Error, 'Error');
        });

        it('answer was auto-corrected', function() {
            chai.assert.exists(answer.auto_corrected);
            chai.assert.isTrue(answer.auto_corrected);
        });

        it('right amount of points were given', function() {
            chai.assert.exists(answer.auto_corrected);
            chai.assert.strictEqual(answer.points, 10);
        });
    });
}

function testAllAnswers(submission) {
    describe('testing all answers in unison', function() {
        let error;
        it('correction is executed', function(done) {
            correction.beginCorrection(submission.answers, function(err) {
                error = err;
                done();
            });
        });

        it('correction has error', function() {
            chai.assert.exists(error);
            chai.assert.instanceOf(error, Error, 'Error');
        });

        for (let answer of submission.answers) {
            it('submission was auto-corrected', function() {
                chai.assert.exists(answer.auto_corrected);
                chai.assert.isTrue(answer.auto_corrected);
            });
        }
    });
}

(function() {
    // submission save then use answers of submission
    testAnswer(numberAnswer);
    testAnswer(rangeAnswer);
    testAnswer(regexAnswer);
    testAnswer(noneAnswer);
    testAllAnswers(submission);
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
});
*/
