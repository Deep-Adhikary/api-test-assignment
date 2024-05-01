import request from 'supertest';
import { expect } from 'chai';
import { testConfig } from '../fixture/config.data';
import { validRequestData } from '../fixture/valid.request';


describe('Validate HTTP 401 response is returned if no API Key provided', () => {
    const userID = '12c5e80d-1d8c-4d3d-9632-4a4dbbedf910';
    it('Should return unauthorised for GET /users/<userID> error in not api key provided', async () => {
        const response = await request(testConfig.baseUrl)
            .get(`${testConfig.endPoint}/${userID}`)
        expect(response.status).equal(401);
    });
    
    it('Should return unauthorised for POST /users error in not api key provided', async () => {
        const response = await request(testConfig.baseUrl)
            .post(`${testConfig.endPoint}`)
            .send(validRequestData)
        expect(response.status).equal(401);
    });
});