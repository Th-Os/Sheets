/* eslint-env mocha */

/**
 * Some export tests.
 */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import {Sheet} from '../src/models/sheet';

chai.use(chaiHttp);

describe('Export Test', () => {
    let sheetId;
    it('Get Sheet', (done) => {
        Sheet.find({}, (err, docs) => {
            if (err) throw err;
            sheetId = docs[0]._id;
            done();
        });
    });
    it('Get PDF', (done) => {
        chai.request(app).get('/export/pdf/' + sheetId).send().end((err, res) => {
            if (err) throw err;
            chai.expect(res).to.have.status(200);
            chai.expect(res.header['content-type']).to.contain('pdf');
            done();
        });
    });
    it('Get docx', (done) => {
        chai.request(app).get('/export/docx/' + sheetId).send().end((err, res) => {
            if (err) throw err;
            chai.expect(res).to.have.status(200);
            chai.expect(res.header['content-type']).to.contain('officedocument');
            done();
        });
    });
    it('Get csv', (done) => {
        chai.request(app).get('/export/csv/' + sheetId).send().end((err, res) => {
            if (err) throw err;
            chai.expect(res).to.have.status(200);
            chai.expect(res.header['content-type']).to.contain('csv');
            done();
        });
    });
    it('Get Template', (done) => {
        chai.request(app).get('/export/template/' + sheetId).send().end((err, res) => {
            if (err) throw err;
            chai.expect(res).to.have.status(200);
            chai.expect(res.header['content-type']).to.contain('text/plain');
            done();
        });
    });
});