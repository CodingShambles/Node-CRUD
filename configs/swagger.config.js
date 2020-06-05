module.exports = class SwaggerConfig {
    static getConfig() {
        return {
            swaggerDefinition: {
                info: {
                    title: 'CRUD Api',
                    version: '1.0.0',
                    description: 'API para realizar o CRUD em MongoDB',
                },

            },
            apis: ['./docs/*.js'],
        };
    }
}