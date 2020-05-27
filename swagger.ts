import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      version: '1.0.0',
      title: 'APIs Document',
      description: 'Unicorn Rental',
      termsOfService: '',
    },
  },
  // Path to the API docs
  apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
