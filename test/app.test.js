'use strict';

import { expect } from 'chai';

process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');

chai.use(chaiHttp);

describe('/POST invalid/', () => {
    const invalidData = {
        invalid_key1: 'invalidValue1',
        invalid_key2: 'invalidValue2',
    };
    it('it should throw a 404 Not Found', (done) => {
        chai.request(server)
            .post('/services/invalid')
            .send(invalidData)
            .end(() => {
                expect(404);
                done();
            });
    });
});

describe('/GET invalid/', () => {
    it('it should throw a 404 Not Found', (done) => {
        chai.request(server)
            .get('/services/invalid')
            .end(() => {
                expect(404);
                done();
            });
    });
});