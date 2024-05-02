import request from 'supertest';
import { expect } from 'chai';
import { testConfig } from '../fixture/config.data';
import {
    requestDataInvalidFName,
    requestDataInvalidLName,
    requestInValidDateOfBirth,
    missingDoB,
    invalidEmailUserData,
    requestDataInvalidPassword,
    invalidRatingUserData,
    invalidRequestTitle,
    validRequestTitle,
    requestDataWithAdditionalParameters
} from '../fixture/requests.data.validate.input';
import { validateErrorResponse } from '../fixture/error.json.schema';
describe('Validate Input Fields', () => {
    /**
     * Title
     */
    validRequestTitle.forEach((userData, index) => {
        it(`${index}: Should create user with valid title:'${userData.title}'`, async () => {
            const response = await request(testConfig.baseUrl)
                .post(`${testConfig.endPoint}`)
                .send(userData)
                .set(testConfig.authorizationHeader);
            expect(response.status).equal(200);

            expect(response.body.status).equal('Success');
        });
    });
    invalidRequestTitle.forEach((userData, index) => {
        // @ts-ignore
        it(`${index}: Should not create user with invalid title:'${userData.title}'`, async () => {
            const response = await request(testConfig.baseUrl)
                .post(`${testConfig.endPoint}`)
                .send(userData)
                .set(testConfig.authorizationHeader);
            expect(response.status).equal(400);

            expect(response.body.errorType).equal('BadRequest');
            expect(response.body.errorMessage).equal(
                'Validation error - unknown title'
            );
        });
    });
    /**
     * First Name
     */
    requestDataInvalidFName.forEach((userData, index) => {
        it(`${index}: Should not create user with invalid Fname:'${userData.firstName}'`, async () => {
            const response = await request(testConfig.baseUrl)
                .post(`${testConfig.endPoint}`)
                .send(userData)
                .set(testConfig.authorizationHeader);
            expect(response.status).equal(400);

            expect(response.body.errorType).equal('BadRequest');
            //This is not a valid response as it is not using human redadable data not a functional failure but not conforming with acceptance criteria.
            // As expected error message is not provided cannot validate
            expect(response.body.errorMessage).equal('__ERR_FNAME_INVALID__');
            const validationResult=validateErrorResponse(response.body)
            expect(validationResult).to.be.true
        });
    });
    /**
     * Last Name
     */
    requestDataInvalidLName.forEach((userData, index) => {
        it(`${index}: Should not create user with invalid Last Name: '${userData.lastName}'`, async () => {
            const response = await request(testConfig.baseUrl)
                .post(`${testConfig.endPoint}`)
                .send(userData)
                .set(testConfig.authorizationHeader);
            //It is failing for 256 character last name
            expect(response.status).equal(400);
            expect(response.body.errorType).equal('BadRequest');
            expect(response.body.errorMessage).equal(
                'Validation error - last name must be between 2 and 255 characters'
            );
            const validationResult=validateErrorResponse(response.body)
            expect(validationResult).to.be.true
        });
    });
    /**
     * Date Of Birth
     */
    requestInValidDateOfBirth.forEach((userData, index) => {
        it(`${index}: Should not create user with invalid DoB:'${userData.dateOfBirth}'`, async () => {
            const response = await request(testConfig.baseUrl)
                .post(`${testConfig.endPoint}`)
                .send(userData)
                .set(testConfig.authorizationHeader);
            expect(response.status).equal(400);

            //It is accepting invalid date 9999-33-33
            expect(response.body.errorType).equal('BadRequest');
            expect(response.body.errorMessage).equal(
                'Validation error - date of birth must be in YYYY-MM-DD format'
            );
            const validationResult=validateErrorResponse(response.body)
            expect(validationResult).to.be.true
        });
    });
    //Imparity with other first name and last name
    it('Should not create user with missing DoB', async () => {
        const response = await request(testConfig.baseUrl)
            .post(`${testConfig.endPoint}`)
            .send(missingDoB)
            .set(testConfig.authorizationHeader);
        expect(response.status).equal(502);
    });

    /**
     * Email
     */
    invalidEmailUserData.invalidEmail.forEach((userData, index) => {
        it(`${index}: Should not create user with invalid email:'${userData.email}'`, async () => {
            const response = await request(testConfig.baseUrl)
                .post(`${testConfig.endPoint}`)
                .send(userData)
                .set(testConfig.authorizationHeader);
            expect(response.status).equal(400);

            expect(response.body.errorType).equal('BadRequest');
            expect(response.body.errorMessage).equal(
                'Validation error - must provide valid e-mail add' //incorrect msg
            );
            const validationResult=validateErrorResponse(response.body)
            expect(validationResult).to.be.true
        });
    });
    it('Should not create user with missing email', async () => {
        const response = await request(testConfig.baseUrl)
            .post(`${testConfig.endPoint}`)
            .send(invalidEmailUserData.missingEmail)
            .set(testConfig.authorizationHeader);
        expect(response.status).equal(502);
    });
    //App is creating using using existing email
    it(`Should not create user with existing email: '${invalidEmailUserData.existingEmail.email}'`, async () => {
        const response = await request(testConfig.baseUrl)
            .post(`${testConfig.endPoint}`)
            .send(invalidEmailUserData.existingEmail)
            .set(testConfig.authorizationHeader);
        expect(response.status).not.equal(200);
    });
    /**
     * Password
     */
    requestDataInvalidPassword.forEach((userData, index) => {
        it(`${index}: Should not create user invalid password '${userData.password}'`, async () => {
            const response = await request(testConfig.baseUrl)
                .post(`${testConfig.endPoint}`)
                .send(userData)
                .set(testConfig.authorizationHeader);
            expect(response.status).not.equal(200);
        });
    });

    /**
     * Rating
     */
    invalidRatingUserData.forEach((userData, index) => {
        it(`${index}: Should not create user with invalid rating: '${userData.rating}' `, async () => {
            const response = await request(testConfig.baseUrl)
                .post(`${testConfig.endPoint}`)
                .send(userData)
                .set(testConfig.authorizationHeader);
            expect(response.status).equal(400);

            expect(response.body.errorType).equal('BadRequest');
            expect(response.body.errorMessage).equal(
                'Validation error - rating is required' //incorrect msg
            );
            const validationResult=validateErrorResponse(response.body)
            expect(validationResult).to.be.true
        });
    });
    /**
     * Request with additional parameter
     */
    it('Should not create user with additional request parameter', async () => {
        const response = await request(testConfig.baseUrl)
            .post(`${testConfig.endPoint}`)
            .send(requestDataWithAdditionalParameters)
            .set(testConfig.authorizationHeader);
        expect(response.status).not.equal(200);
    });
});
