'use strict';

import { expect } from 'chai';

process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');

chai.use(chaiHttp);

describe('/POST user/', () => {
    const userData = {
        first_name: 'testFirstname',
        last_name: 'testLastname',
    };
    it('it should create an entry for the user with given information', (done) => {
        chai.request(server)
            .post('/services/user')
            .send(userData)
            .end((err, res) => {
                expect(200);
                expect(res.body.user_id).to.be.a('number');
                done();
            });
    });
});

describe('/POST user/', () => {
    const userData = {
        first_name: 'test!@#$',
        last_name: 'testLastname',
    };
    it('it should return a 422 for invalid input for first_name', (done) => {
        chai.request(server)
            .post('/services/user')
            .send(userData)
            .end(() => {
                expect(422);
                done();
            });
    });
});

describe('/GET user/:user_id', () => {
    it('it should GET the user given the id', (done) => {
        chai.request(server)
            .get('/services/user/44')
            .end((err, res) => {
                expect(200);
                expect(res.body.user.user_id).to.be.equal(44);
                done();
            });
    });
});

describe('/GET user/:user_id', () => {
    it('it should return a 404 for user not found', (done) => {
        chai.request(server)
            .get('/services/user/1000')
            .end((err, res) => {
                expect(404);
                expect(res.body.Error).to.be.equal('No records found for the specified user.');
                done();
            });
    });
});

describe('/GET user/:user_id', () => {
    it('it should return a 422 for invalid input for user_id', (done) => {
        chai.request(server)
            .get('/services/user/a1')
            .end(() => {
                expect(422);
                done();
            });
    });
});
