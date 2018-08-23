/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import {Answer} from '../src/models/submission';
import {User} from '../src/models/user';

let expect = chai.expect();

chai.use(chaiHttp);

describe('API Test', () => {
    beforeEach((done) => {
        // init db objects;
        done();
    });

    describe('API Users', () => {
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
    });

    describe('API Course', () => {
        let course = {
            name: 'EIMI',
            faculty: 'MI',
            semester: 'SoSe 2011',
            min_req_sheets: 3
        };
        it('POST course', (done) => {
            chai.request(app).post('/courses').send(course).end((err, res) => {
                if (err) throw err;
                chai.expect(res).to.have.status(200);
                done();
            });
        });
    });
});