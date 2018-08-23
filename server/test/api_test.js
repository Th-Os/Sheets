/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import {Answer} from '../src/models/submission';
import {User} from '../src/models/user';

let should = chai.should();

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
        it('POST', (done) => {
            chai.request(app).post('/user/').send(user).end((err, res) => {
                if (err) throw err;
                // console.log(res);
                done();
            });
        });
    });
});