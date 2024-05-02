import Ajv, { JSONSchemaType } from "ajv";

// Define the interface for the response
interface ErrorResponse {
    errorType: string;
    errorMessage: string;
}

// Setup Ajv and the JSON schema
const ajv = new Ajv(); // options can be passed, e.g. { allErrors: true }
const errorResponseSchema: JSONSchemaType<ErrorResponse> = {
    type: "object",
    properties: {
        errorType: { type: "string" },
        errorMessage: { type: "string" }
    },
    required: ["errorType", "errorMessage"],
    additionalProperties: false
};

// Compile the schema
export const validateErrorResponse = ajv.compile(errorResponseSchema);