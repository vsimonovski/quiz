import Ajv from 'ajv';

interface RefreshToken {
    refreshToken: string;
}

const ajv = new Ajv();

const refreshTokenValidator = ajv.compile({
    type: 'object',
    properties: {
        refreshToken: {
            type: 'string',
        },
    },
    required: ['refreshToken'],
    additionalProperties: false,
});

export { RefreshToken, refreshTokenValidator };
