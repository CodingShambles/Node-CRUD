module.exports = new class Server {
    constructor() {
        this.express = require('express');
        this.bodyParser = require('body-parser');
        this.path = require('path')

        this.AppConfig = require('../configs/app.config')
        this.FolderFactory = require('../common/folderFactory')
        this.LoggerFactory = require('../common/loggerFactory');
        this.logger = require('../common/loggerFactory').getLogger();

        this.app = this.express();
    }

    async initServer() {
        const swagger = await this.configureSwagger();
        const jasmine = await this.configureJasmine();
        await this.configureMiddlewares();
        await this.initServerListener();
        await this.configureRoutes(swagger);
        await this.executeJasmineTests(jasmine);

    }

    async configureSwagger() {
        return new Promise((resolve, reject) => {
            try {
                const fs = require('fs')

                this.logger.info("[SWAGGER] Configurando o módulo")
                const swaggerUi = require('swagger-ui-express');
                const swaggerJsdoc = require('swagger-jsdoc');
                const swaggerConfig = require('../configs/swagger.config')
                const swaggerSpecs = swaggerJsdoc(swaggerConfig.getConfig());

                this.logger.info("[SWAGGER] Gerando o arquivo swagger.json...")
                fs.writeFile('outputs/swagger.json', JSON.stringify(swaggerSpecs), (err) => {
                    if (err) {
                        this.logger.info('[SWAGGER] Ocorreu uma falha ao gerar o arquivo swagger.json');
                        this.logger.info('[SWAGGER] Erro: ' + err);
                        throw err;
                    } else {
                        this.logger.info('[SWAGGER] O arquivo swagger.json foi gerado com sucesso.');
                        resolve({ swaggerUi: swaggerUi, swaggerSpecs: swaggerSpecs })
                    }
                });
            } catch (e) {
                reject(e)
            }
        })
    }


    async configureJasmine() {
        return new Promise((resolve, reject) => {
            try {
                this.logger.info("[JASMINE] Configurando o módulo")
                const Jasmine = require('jasmine');
                const jasmine = new Jasmine();
                const jasmineConfig = require('../configs/jasmine.config')
                const HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;
                const path = require('path');
                const AppConfig = require('../configs/app.config').getConfig();

                jasmine.loadConfig(jasmineConfig.getConfig());
                jasmine.addReporter(new HtmlReporter({
                    path: path.join(__dirname, '../outputs')
                }));
                resolve(jasmine);
            } catch (e) {
                reject(e)
            }
        })

    }

    async configureMiddlewares() {
        return new Promise((resolve, reject) => {
            try {
                this.logger.info('[MIDDLEWARES] Configurando os middlewares do sistema')
                this.app.use(this.bodyParser.json());
                this.app.use(this.bodyParser.urlencoded({ extended: false }));
                this.app.use(this.express.static(this.path.join(__dirname, '../public')));

                this.app.set('views', this.path.join(__dirname, '../views'));
                this.app.set('view engine', 'ejs');
                resolve()
            } catch (e) {
                reject(e);
            }
        })

    }

    async initServerListener() {
        return new Promise((resolve, reject) => {
            try {
                const serverInfo = this.AppConfig.getConfig().server;
                this.logger.info("[SERVIDOR] Inicializando o servidor...")
                this.app.listen(serverInfo.port, () => {
                    this.logger.info('[SERVIDOR] O servidor foi iniciado com sucesso.')
                    this.logger.info(`[SERVIDOR] Endereço: ${ serverInfo.ip }:${ serverInfo.port }`)
                    resolve()
                });
            } catch (e) {
                reject(e)
            }
        })
    }


    async configureRoutes(swagger) {
        return new Promise((resolve, reject) => {
            try {
                this.logger.info("[ROTAS] Configurando as rotas do servidor")
                this.app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.swaggerSpecs)); // Swagger na página inicial
                this.app.get('/', (req, res) => res.render('../views/pages/index'));
                this.app.get('/api-tests', (req, res) => res.sendFile(this.path.join(__dirname, '../outputs/report.html')));

                const objeto = require('../routes/objeto.route');
                this.app.use('/api/objetos', objeto.getRoutes());
                resolve()
            } catch (e) {
                reject(e);
            }
        })

    }


    async executeJasmineTests(jasmine) {
        return new Promise((resolve, reject) => {
            try {
                const serverInfo = this.AppConfig.getConfig().server
                this.logger.info("[JASMINE] Executando testes...")
                jasmine.configureDefaultReporter({
                    print: function() {},
                });

                jasmine.execute()
                jasmine.onComplete((passed) => {
                    this.logger.info("[JASMINE] Testes finalizados")
                    if (passed) {
                        this.logger.info(`[JASMINE] Resultado: todos os testes passaram!`)
                        resolve(true);
                    } else {
                        this.logger.error(`[JASMINE] Resultado: ao menos um teste falhou. Para mais informações, acesse http://${serverInfo.ip}:${serverInfo.port}/api-tests`)
                        resolve(false);
                    }
                });
            } catch (e) {
                reject(e)
            }
        })
    }
}