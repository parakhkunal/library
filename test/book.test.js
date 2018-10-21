'use strict';

import { expect } from 'chai';

process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');

chai.use(chaiHttp);

describe('/POST book/', () => {
    const bookData = {
        author: 'testAuthor',
        title: 'testTitle',
    };
    it('it should create an entry for the book with given information', (done) => {
        chai.request(server)
            .post('/services/book')
            .send(bookData)
            .end((err, res) => {
                expect(200);
                expect(res.body.book_id).to.be.a('number');
                done();
            });
    });
});

describe('/POST book/', () => {
    const bookData = {
        author: 123,
        title: 'testTitle',
    };
    it('it should return a 422 for invalid input for author', (done) => {
        chai.request(server)
            .post('/services/book')
            .send(bookData)
            .end(() => {
                expect(422);
                done();
            });
    });
});

describe('/GET book/:book_id', () => {
    it('it should GET the book given the id', (done) => {
        chai.request(server)
            .get('/services/book/4')
            .end((err, res) => {
                expect(200);
                expect(res.body.book.book_id).to.be.equal(4);
                done();
            });
    });
});

describe('/GET book/:book_id', () => {
    it('it should return a 404 for book not found', (done) => {
        chai.request(server)
            .get('/services/book/1000')
            .end((err, res) => {
                expect(404);
                expect(res.body.Error).to.be.equal('No records found for the specified book.');
                done();
            });
    });
});

describe('/GET book/:book_id', () => {
    it('it should return a 422 for invalid input for book_id', (done) => {
        chai.request(server)
            .get('/services/book/a1')
            .end(() => {
                expect(422);
                done();
            });
    });
});
