import _ from 'lodash';
const requestData = {
    title: 'Mr',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1987-06-04',
    email: 'somefake@email.com',
    password: 'super secret password',
    rating: 10
};
export const requestDataInvalidFName = [
    {
        title: 'Mr',
        lastName: 'Doe',
        dateOfBirth: '1987-06-04',
        email: 'somefake@email.com',
        password: 'super secret password',
        rating: 10
    },
    {
        title: 'Mr',
        firstName: 'J',
        lastName: 'Doe',
        dateOfBirth: '1987-06-04',
        email: 'somefake@email.com',
        password: 'super secret password',
        rating: 10
    },
    {
        title: 'Mr',
        firstName: 'a'.repeat(256),
        lastName: 'Doe',
        dateOfBirth: '1987-06-04',
        email: 'somefake@email.com',
        password: 'super secret password',
        rating: 10
    }
];
export const requestDataInvalidLName = [
    {
        title: 'Mr',
        firstName: 'John',
        dateOfBirth: '1987-06-04',
        email: 'somefake@email.com',
        password: 'super secret password',
        rating: 10
    },
    {
        title: 'Mr',
        firstName: 'John',
        lastName: 'D',
        dateOfBirth: '1987-06-04',
        email: 'somefake@email.com',
        password: 'super secret password',
        rating: 10
    },
    {
        title: 'Mr',
        firstName: 'John',
        lastName: 'D'.repeat(256),
        dateOfBirth: '1987-06-04',
        email: 'somefake@email.com',
        password: 'super secret password',
        rating: 10
    }
];

export const requestInValidDateOfBirth = [
    {
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: 'invalid date',
        email: 'somefake@email.com',
        password: 'super secret password',
        rating: 10
    },
    {
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '-33-33',
        email: 'somefake@email.com',
        password: 'super secret password',
        rating: 10
    },
    {
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '9999-33-33',
        email: 'somefake@email.com',
        password: 'super secret password',
        rating: 10
    }
];
export const missingDoB = {
    title: 'Mr',
    firstName: 'John',
    lastName: 'Doe',
    email: 'somefake@email.com',
    password: 'super secret password',
    rating: 10
};
export const invalidEmailUserData = {
    missingEmail: {
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1987-06-04',
        password: 'super secret password',
        rating: 10
    },
    invalidEmail: [
        {
            title: 'Mr',
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '1987-06-04',
            email: 'email.com',
            password: 'super secret password',
            rating: 10
        },
        {
            title: 'Mr',
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '1987-06-04',
            email: '',
            password: 'super secret password',
            rating: 10
        }
    ],
    existingEmail: {
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1987-06-04',
        email: 'somefake@email.com',
        password: 'super secret password',
        rating: 10
    }
};
export const requestDataInvalidPassword = [{
    title: 'Mr',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1987-06-04',
    email: 'somefake@email.com',
    rating: 10
},
{
    title: 'Mr',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1987-06-04',
    email: 'somefake@email.com',
    password: '',
    rating: 10
}
];
export const invalidRatingUserData=[
    {
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1987-06-04',
        email: 'somefake@email.com',
        password: 'super secret password',
    },
    {
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1987-06-04',
        email: 'somefake@email.com',
        password: 'super secret password',
        rating: -1
    },
    {
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1987-06-04',
        email: 'somefake@email.com',
        password: 'super secret password',
        rating: 11
    }
]
const requestDataNoTitle = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1987-06-04',
    email: 'somefake@email.com',
    password: 'super secret password',
    rating: 10
};

export const invalidRequestTitle=[
    requestDataNoTitle,
    {title:'',..._.cloneDeep(requestDataNoTitle)},
    {title:'Dr',..._.cloneDeep(requestDataNoTitle)},
    {title:'mr',..._.cloneDeep(requestDataNoTitle)}
]
export const validRequestTitle=['Mr', 'Mrs', 'Miss', 'Ms', 'Mx'].map(title=>{
    return {title: title,..._.cloneDeep(requestDataNoTitle)}
})
    
