import _ from 'lodash';
const requestData = {
    title: 'Mr',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1987-06-04',
    email: 'somefake@email.com',
    password: 'super secret password'
};
export const ratingData = [
    {
        rating: 0,
        status: 'rejected',
        data: { ..._.cloneDeep(requestData), rating: 0 }
    },
    {
        rating: 1,
        status: 'new',
        data: { ..._.cloneDeep(requestData), rating: 1 }
    },
    {
        rating: 4,
        status: 'new',
        data: { ..._.cloneDeep(requestData), rating: 4 }
    },
    {
        rating: 5,
        status: 'active',
        data: { ..._.cloneDeep(requestData), rating: 5 }
    },
    {
        rating: 10,
        status: 'active',
        data: { ..._.cloneDeep(requestData), rating: 10 }
    }
];
