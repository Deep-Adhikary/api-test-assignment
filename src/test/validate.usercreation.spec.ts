import request from 'supertest';
import { expect } from 'chai';
import { testConfig } from '../fixture/config.data';
import {
    validRequestData,
    userResponseDataType
} from '../fixture/valid.request';

describe('Validate User Creation End to End', () => {
    let userID = '';
    // @ts-ignore
    let userData: userResponseDataType = undefined;
    it(`Should create user with valid data`, async () => {
        const response = await request(testConfig.baseUrl)
            .post(`${testConfig.endPoint}`)
            .send(validRequestData)
            .set(testConfig.authorizationHeader);
        expect(response.status).equal(200);

        expect(response.body.status).equal('Success');

        userData = response.body.data;
        userID = userData.userId;
        expect(userData).to.have.property('userId');
        expect(userData.title).equal(validRequestData.title);
        expect(userData.firstName).equal(validRequestData.firstName);
        expect(userData.lastName).equal(validRequestData.lastName);
        expect(userData.dateOfBirth).equal(validRequestData.dateOfBirth);
        expect(userData.email).equal(validRequestData.email);
        expect(userData.rating).equal(validRequestData.rating);
        expect(userData).to.have.property('status');
    });
    it('Should verify that password is not part of user creation response', async () => {
        expect(userData).not.to.have.property('password');
    });
    it('Should fetch user correctly with GET /user endpoint', async () => {
        const response = await request(testConfig.baseUrl)
            .get(`${testConfig.endPoint}/${userID}`)
            .set(testConfig.authorizationHeader);
        expect(response.status).equal(200);

        userData = response.body.data;
        
        expect(userData).to.have.property('userId');
        expect(userData.title).equal(validRequestData.title);
        expect(userData.firstName).equal(validRequestData.firstName);
        expect(userData.lastName).equal(validRequestData.lastName);
        expect(userData.dateOfBirth).equal(validRequestData.dateOfBirth);
        expect(userData.email).equal(validRequestData.email);
        expect(userData.rating).equal(validRequestData.rating);
        expect(userData).to.have.property('status');
    });
    it('Should verify that password is not part of user fetch response', async () => {
        expect(userData).not.to.have.property('password');
    });
});
