import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv();
// Add UUID format validation
ajv.addFormat('uuid', {
    type: 'string',
    validate: (uuid: string) => {
        return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
            uuid
        );
    }
});
// Add date format validation
ajv.addFormat('date', {
    type: 'string',
    validate: (date: string) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(date)) {
            return false;
        }
        const dateValue = new Date(date);
        const dateNum = dateValue.getTime();
        // Check if date is valid
        if (!dateNum && dateNum !== 0) return false; // `dateNum` is NaN if the date is invalid
        // Ensure that the input matches the date created (to avoid wrapping, e.g., "2023-02-31" becoming "2023-03-03")
        return date === dateValue.toISOString().split('T')[0];
    }
});
// Add custom email format validation
ajv.addFormat('email', {
    type: 'string',
    validate: (email: string) => {
        // Simple email validation regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});

interface UserData {
    userId: string;
    status: string;
    title: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    rating: number;
}

interface ApiResponse {
    status: string;
    data: UserData;
    error: null | string;
}
// @ts-ignore
const schema: JSONSchemaType<ApiResponse> = {
    type: 'object',
    properties: {
        status: { type: 'string', const: 'Success' },
        data: {
            type: 'object',
            properties: {
                userId: { type: 'string', format: 'uuid' },
                status: { type: 'string', enum: ['active'] },
                title: {
                    type: 'string',
                    enum: ['Mr', 'Mrs', 'Miss', 'Ms', 'Mx']
                },
                firstName: { type: 'string', minLength: 2, maxLength: 255 },
                lastName: { type: 'string', minLength: 2, maxLength: 255 },
                dateOfBirth: { type: 'string', format: 'date' },
                email: { type: 'string', format: 'email' },
                rating: { type: 'number', minimum: 1, maximum: 10 }
            },
            required: [
                'userId',
                'status',
                'title',
                'firstName',
                'lastName',
                'dateOfBirth',
                'email',
                'rating'
            ],
            additionalProperties: false
        },
        error: { type: 'null' }
    },
    required: ['status', 'data', 'error'],
    additionalProperties: false
};
export const responseSchemaValidator = ajv.compile(schema);
