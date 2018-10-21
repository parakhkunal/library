'use strict';

import { expect } from 'chai';

process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');

chai.use(chaiHttp);

// Be careful with this test as the user_id, book_id might have been deleted by some other means
describe('/POST user/:user_id/book/:book_id', () => {
    it('it should create an entry for the user in the library for the given book_id and should return user_library_id', (done) => {
        chai.request(server)
            .post('/services/user/65/book/3')
            .end((err, res) => {
                expect(200);
                expect(res.body.user_library_id).to.be.a('number');
                done();
            });
    });
});

describe('/POST user/:user_id/book/:book_id', () => {
    it('it should return an error as another user is trying to issue an already issued book', (done) => {
        chai.request(server)
            .post('/services/user/45/book/9')
            .end((err, res) => {
                expect(500);
                expect(res.body.Error).to.be.equal('The book is already issued to a user.');
                done();
            });
    });
});

describe('/POST user/:user_id/book/:book_id', () => {
    it('it should return an error as invalid user is trying to issue a book', (done) => {
        chai.request(server)
            .post('/services/user/999/book/9')
            .end((err, res) => {
                expect(404);
                expect(res.body.Error).to.be.equal('User or Book not found.');
                done();
            });
    });
});

describe('/POST user/:user_id/book/:book_id', () => {
    it('it should return an error as a valid user is trying to issue a non existing book', (done) => {
        chai.request(server)
            .post('/services/user/45/book/999')
            .end((err, res) => {
                expect(404);
                expect(res.body.Error).to.be.equal('User or Book not found.');
                done();
            });
    });
});

describe('/POST user/:user_id/book/:book_id', () => {
    it('it should return a 422 for invalid input for user_id', (done) => {
        chai.request(server)
            .post('/services/user/45Z/book/9')
            .end(() => {
                expect(422);
                done();
            });
    });
});

describe('/PUT user/:user_id/book/:book_id/operation/:mark_as_read', () => {
    it('it should mark book of the user in the library as read', (done) => {
        chai.request(server)
            .put('/services/user/45/book/8/operation/1')
            .end((err, res) => {
                expect(200);
                expect(res.body.message).to.be.equal('Record successfully updated.');
                done();
            });
    });
});

describe('/PUT user/:user_id/book/:book_id/operation/:mark_as_read', () => {
    it('it should mark book of the user in the library as unread', (done) => {
        chai.request(server)
            .put('/services/user/45/book/8/operation/0')
            .end((err, res) => {
                expect(200);
                expect(res.body.message).to.be.equal('Record successfully updated.');
                done();
            });
    });
});

describe('/PUT user/:user_id/book/:book_id/operation/:mark_as_read', () => {
    it('it should return 404 not found for the given combination', (done) => {
        chai.request(server)
            .put('/services/user/45/book/999/operation/0')
            .end((err, res) => {
                expect(200);
                expect(res.body.Error).to.be.equal('Library entry not found.');
                done();
            });
    });
});

describe('/PUT user/:user_id/book/:book_id/operation/:mark_as_read', () => {
    it('it should return a 422 for invalid input for mark_as_read (should be boolean)', (done) => {
        chai.request(server)
            .put('/services/user/45/book/8/operation/123')
            .end(() => {
                expect(422);
                done();
            });
    });
});

// Be careful with this test as the user_id, book_id might have been deleted by some other means
describe('/DELETE user/:user_id/book/:book_id', () => {
    it('it should delete the book entry of the user from library', (done) => {
        chai.request(server)
            .delete('/services/user/65/book/3')
            .end((err, res) => {
                expect(200);
                expect(res.body.message).to.be.equal('Record successfully deleted.');
                done();
            });
    });
});

describe('/DELETE user/:user_id/book/:book_id', () => {
    it('it should return 404 not found for the given combination', (done) => {
        chai.request(server)
            .delete('/services/user/45/book/999')
            .end((err, res) => {
                expect(200);
                expect(res.body.Error).to.be.equal('Library entry not found.');
                done();
            });
    });
});

describe('/DELETE user/:user_id/book/:book_id', () => {
    it('it should return a 422 for invalid input for book_id', (done) => {
        chai.request(server)
            .put('/services/user/45/book/8Z')
            .end(() => {
                expect(422);
                done();
            });
    });
});

describe('/GET user/:user_id/books', () => {
    it('it should give details of all the books issued by the requested user', (done) => {
        chai.request(server)
            .get('/services/user/44/books')
            .end((err, res) => {
                expect(200);
                expect(res.body.books[0].book_id).to.be.a('number');
                expect(res.body.books[0].author).to.be.a('string');
                expect(res.body.books[0].title).to.be.a('string');
                done();
            });
    });
});

describe('/GET user/:user_id/books?filter=:value', () => {
    it('it should give details of all the read books issued by the requested user', (done) => {
        chai.request(server)
            .get('/services/user/44/books?filter=read')
            .end((err, res) => {
                expect(200);
                expect(res.body.books[0].book_id).to.be.a('number');
                expect(res.body.books[0].author).to.be.a('string');
                expect(res.body.books[0].title).to.be.a('string');
                done();
            });
    });
});

describe('/GET user/:user_id/books?filter=:value', () => {
    it('it should give details of all the unread books issued by the requested user', (done) => {
        chai.request(server)
            .get('/services/user/44/books?filter=unread')
            .end((err, res) => {
                expect(200);
                expect(res.body.books[0].book_id).to.be.a('number');
                expect(res.body.books[0].author).to.be.a('string');
                expect(res.body.books[0].title).to.be.a('string');
                done();
            });
    });
});

describe('/GET user/:user_id/books?filter=:value', () => {
    it('it should give details of all the books issued by the requested user grouped by authors', (done) => {
        chai.request(server)
            .get('/services/user/44/books?filter=author')
            .end((err, res) => {
                expect(200);
                expect(res.body.books).to.be.a('object');
                done();
            });
    });
});

describe('/GET user/:user_id/books?filter=:value', () => {
    it('it should give details of all the books issued by the requested user disregarding the invalid filter value', (done) => {
        chai.request(server)
            .get('/services/user/44/books?filter=invalid')
            .end((err, res) => {
                expect(200);
                expect(res.body.books[0].book_id).to.be.a('number');
                expect(res.body.books[0].author).to.be.a('string');
                expect(res.body.books[0].title).to.be.a('string');
                done();
            });
    });
});

describe('/GET user/:user_id/books', () => {
    it('it should return 404 not found as there are no books for in the library for the user', (done) => {
        chai.request(server)
            .get('/services/user/999/books')
            .end((err, res) => {
                expect(404);
                expect(res.body.Error).to.be.equal('No records found for the user in library.');
                done();
            });
    });
});

describe('/GET user/:user_id/books', () => {
    it('it should return a 422 for invalid input for user_id', (done) => {
        chai.request(server)
            .get('/services/user/45Z/books')
            .end(() => {
                expect(422);
                done();
            });
    });
});
