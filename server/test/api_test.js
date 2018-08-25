/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);

describe('API Test', () => {
    describe('API POST', () => {
        let user = {
            username: 'bla',
            password: 'pass',
            role: { name: 'admin' }
        };
        it('POST user with role', (done) => {
            chai.request(app).post('/users').send(user).end((err, res) => {
                if (err) throw err;
                chai.expect(res).to.have.status(200);
                done();
            });
        });

        let course = {
            name: 'EIMI',
            faculty: 'MI',
            semester: 'SoSe 2011',
            min_req_sheets: 3
        };
        let courseId;
        it('POST course', (done) => {
            chai.request(app).post('/courses').send(course).end((err, res) => {
                if (err) throw err;
                chai.expect(res).to.have.status(200);
                courseId = res.body[0]._id;
                console.log(courseId);
                done();
            });
        });

        let sheet = {
            name: 'Übung 1',
            submissiondate: '2016-05-18 10:00:00.000',
            min_req_points: 10
        };
        let sheetId;
        it('POST sheet', (done) => {
            chai.request(app).post('/courses/' + courseId + '/sheets').send(sheet).end((err, res) => {
                if (err) throw err;
                chai.expect(res).to.have.status(200);
                sheetId = res.body[0]._id;
                done();
            });
        });

        let exercise = {
            name: 'First exercise',
            description: 'Do something',
            order: 1
        };
        let exerciseId;
        it('POST exercise', (done) => {
            chai.request(app).post('/sheets/' + sheetId + '/exercises').send(exercise).end((err, res) => {
                if (err) throw err;
                chai.expect(res).to.have.status(200);
                exerciseId = res.body[0]._id;
                done();
            });
        });

        let task = {
            question: 'How much is 1+1?',
            points: 5,
            order: 1,
            choices: '2|3|4'
        };
        let taskId;
        it('POST task', (done) => {
            chai.request(app).post('/exercises/' + exerciseId + '/tasks').send(task).end((err, res) => {
                if (err) throw err;
                chai.expect(err).to.not.be.an.instanceOf(Error);
                chai.expect(res).to.have.status(200);
                taskId = res.body[0]._id;
                done();
            });
        });

        let solution = {
            type: 'number',
            number: 2,
            hint: 'not 1 and not 3'
        };
        let solutionId;
        it('POST solution', (done) => {
            chai.request(app).post('/tasks/' + taskId + '/solutions').send(solution).end((err, res) => {
                if (err) throw err;
                chai.expect(res).to.have.status(200);
                solutionId = res.body[0]._id;
                done();
            });
        });

        let student = {
            name: 'Bernd',
            mat_nr: 1234567
        };
        let studentId;
        it('POST student', (done) => {
            chai.request(app).post('/students/').send(student).end((err, res) => {
                if (err) throw err;
                chai.expect(res).to.have.status(200);
                studentId = res.body[0]._id;
                done();
            });
        });

        let submission = {
            student: undefined
        };
        let submissionId;
        it('POST submission', (done) => {
            submission.student = studentId;
            chai.request(app).post('/sheets/' + sheetId + '/submissions').send(submission).end((err, res) => {
                if (err) throw err;
                chai.expect(res).to.have.status(200);
                submissionId = res.body[0]._id;
                done();
            });
        });

        let answer = {
            text: 'text',
            task: undefined
        };
        let answerId;
        it('POST answer', (done) => {
            answer.task = taskId;
            chai.request(app).post('/submissions/' + submissionId + '/answers').send(answer).end((err, res) => {
                if (err) throw err;
                chai.expect(res).to.have.status(200);
                answerId = res.body[0]._id;
                done();
            });
        });
    });
});