module.exports = new class CRUDSpec {
    constructor() {
        const appConfig = require('../configs/app.config').getConfig()
        this.logger = require('../common/loggerFactory').getLogger();
        this.request = require('request');
        this.apiURL = `http://${appConfig.server.ip}:${appConfig.server.port}/api/objetos`;
        this.id = 'teste_api_jasmine_2019'
        this.init();
    }

    init() {
        describe("CRUD Objeto", () => {
            this.testPost();
            this.testPut();
            this.testGet();
            this.testGetById();
            this.testDelete();
        });
    }

    testGet() {
        it("GET /", (done) => {
            const options = {
                url: `${this.apiURL}/`,
                method: 'GET',
            };
            this.logger.info(`[TESTE] Testando a chamada [${options.method} ${options.url}]`)
            this.request(options, function(error, response, body) {
                let status = response.statusCode
                expect(status).toBe(200);
                done()
            });
        });
    }

    testGetById() {
        it("GET /{name}", (done) => {
            const options = {
                url: `${this.apiURL}/${this.id}`,
                method: 'GET',
            };
            this.logger.info(`[TESTE] Testando a chamada [${options.method} ${options.url}]`)
            this.request(options, function(error, response, body) {
                let status = response.statusCode
                expect(status).toBe(200);
                done()
            });
        });
    }

    testPost() {
        it("POST /", (done) => {
            const options = {
                url: `${this.apiURL}/`,
                method: 'POST',
                body: {
                    name: this.id,
                    price: 5432,
                    quantity: 9812
                },
                json: true
            };
            this.logger.info(`[TESTE] Testando a chamada [${options.method} ${options.url}]`)
            this.request(options, function(error, response, body) {
                let status = response.statusCode
                expect(status).toBe(200);
                done()
            });
        });
    }

    testPut() {
        it("PUT /", (done) => {
            const options = {
                url: `${this.apiURL}/`,
                method: 'PUT',
                body: {
                    filter: {
                        name: this.id
                    },
                    update: {
                        price: 100,
                        quantity: 50
                    }
                },
                json: true
            };
            this.logger.info(`[TESTE] Testando a chamada [${options.method} ${options.url}]`)
            this.request(options, function(error, response, body) {
                let status = response.statusCode
                expect(status).toBe(200);
                done()
            });
        });
    }

    testDelete() {
        it("DELETE /", (done) => {
            const options = {
                url: `${this.apiURL}/`,
                method: 'DELETE',
                body: {
                    name: this.id
                },
                json: true
            };
            this.logger.info(`[TESTE] Testando a chamada [${options.method} ${options.url}]`)
            this.request(options, function(error, response, body) {
                let status = response.statusCode
                expect(status).toBe(200);
                done()
            });
        });
    }
}