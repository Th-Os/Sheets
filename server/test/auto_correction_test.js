/* eslint-env mocha */

/**
 * Some auto correction tests.
 */

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as correction from '../src/correction/correction';
import {CorrectionError} from '../src/utils/errors';
import {Submission, Answer, Student} from '../src/models/submission';
import {Task, Solution} from '../src/models/sheet';

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

(function() {
    describe('Auto Correction Test', () => {
        submission.answers.push(numberAnswer, rangeAnswer, regexAnswer, noneAnswer);
        let errors;
        it('correction is running', function(done) {
            correction.beginCorrection(submission.answers).then((errs) => {
                console.log(errs);
                errors = errs;
                done();
            });
        });
        it('correction correct', function() {
            // no errors
            // chai.expect(errors).to.have.lengthOf(0);
            // all errors
            chai.expect(errors).to.be.an('array');
            for (let error of errors) {
                chai.expect(error.name).to.equal(CorrectionError.name);
            }
        });
    });
})();