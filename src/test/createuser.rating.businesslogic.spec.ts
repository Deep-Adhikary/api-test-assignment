import request from 'supertest';
import { expect } from 'chai';
import { testConfig } from '../fixture/config.data';
import { ratingData } from '../fixture/request.data.rating.businesslogic';

describe('Validate Rating Business Logic', () => {
    ratingData.forEach(rating => {
        it(`Should create user with '${rating.status}' if rating='${rating.rating}'`, async () => {
            const response = await request(testConfig.baseUrl)
                .post(`${testConfig.endPoint}`)
                .send(rating.data)
                .set(testConfig.authorizationHeader);
            expect(response.status).equal(200);

            expect(response.body.status).equal('Success');
            expect(response.body.data.status).equal(rating.status);
        });
    });
});
