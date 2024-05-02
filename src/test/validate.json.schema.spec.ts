import request from 'supertest';
import { expect } from 'chai';
import { testConfig } from '../fixture/config.data';
import { responseSchemaValidator } from '../fixture/success.json.schema';

import { validRequestData } from '../fixture/valid.request';

describe('GET /user endpoint response schema', () => {
   let userID='';
    it(`Validate response JSON schema for POST /user end point`, async () => {
        const response = await request(testConfig.baseUrl)
            .post(`${testConfig.endPoint}`)
            .send(validRequestData)
            .set(testConfig.authorizationHeader);
        expect(response.status).equal(200);
        
        const validationResponse=responseSchemaValidator(response.body)
        console.debug(`Validation Errors:${JSON.stringify(responseSchemaValidator.errors)}`)
        expect(validationResponse).to.be.true;
        expect(responseSchemaValidator.errors).to.have.lengthOf(0);
    });
    it('Validate response JSON schema for GET /user/<userID> end point', async () => {
        console.debug(validRequestData);
        const responseUserCreation = await request(testConfig.baseUrl)
            .post(`${testConfig.endPoint}`)
            .send(validRequestData)
            .set(testConfig.authorizationHeader);
        expect(responseUserCreation.status).equal(200);

        userID = responseUserCreation.body.data.userId;

        const response = await request(testConfig.baseUrl)
            .get(`${testConfig.endPoint}/${userID}`)
            .set(testConfig.authorizationHeader);
        console.debug(response.body)
  
        expect(response.status).equal(200);
        const validationResponse=responseSchemaValidator(response.body)
        console.debug(`Validation Errors:${JSON.stringify(responseSchemaValidator.errors)}`)
       expect(validationResponse).to.be.true;
       expect(responseSchemaValidator.errors).to.have.lengthOf(0);
    });
});
