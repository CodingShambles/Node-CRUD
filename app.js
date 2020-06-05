module.exports = new class App {
    constructor() {
        this.server = require("./server/server");;
        this.LoggerFactory = require('./common/loggerFactory')
        this.logger = this.LoggerFactory.getLogger()
        this.start();
    }

    async start() {
        try {
            this.logger.info("[SERVIDOR] Executando a rotina de inicialização do servidor...")
            this.server.initServer();
        } catch (e) {
            this.logger.error("[SERVIDOR] Ocorreu um problema e não foi possível inicializar o servidor");
            this.logger.error("[SERVIDOR] Erro: ", e);
            process.exit();
        }
    }
}