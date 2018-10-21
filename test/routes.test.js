'use strict';

import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app.js';

describe('GET User Information', () => {
    it('should successfully get user information', async () => {
        await request(app)
            .get('/services/user/43')
            .send()
            .expect(200)
            .then((res) => {
                const body = res.body;
                expect(body.results.user_id).to.be.equal(43);
                // expect(body[0].description).to.be.equal('Other');
            });
    });

    // it('should successfully get a list of SIC codes with descriptions given valid url parameters', async () => {
    //     await request(app)
    //         .get('/services/sicSearch?pageNumber=1&searchText=pizza')
    //         .send()
    //         .expect(200)
    //         .then((res) => {
    //             const body = res.body;
    //             expect(body[0].code).to.be.equal('20330104');
    //             expect(body[0].description).to.be.equal('Pizza sauce: packaged in cans, jars, etc.');
    //         });
    // });

    // it('should return a 400 when bad values are passed in as url parameters', async () => {
    //     await request(app)
    //         .get('/services/sicSearch?pageNumber=as&searchText=$%^$')
    //         .send()
    //         .expect(400)
    //         .then((res) => {
    //             const errors = res.body.error;
    //             expect(errors[0]).to.be.equal('C005');
    //             expect(errors[1]).to.be.equal('C006');
    //         });
    // });
});
