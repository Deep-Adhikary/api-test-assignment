import { faker } from '@faker-js/faker';
export type userResponseDataType={
    userId:string
    title:string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    email: string,
    password: string,
    rating: number
}
export const validRequestData = {
    title: 'Mr',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    dateOfBirth: '1987-06-04',
    email: faker.internet.email(),
    password: 'super secret password',
    rating: 10
};