module.exports = new class MongoConnector {
    constructor() {
        const cfg = require('../configs/mongo.config.js').getConfig();
        const LoggerFactory = require('../common/loggerFactory')

        this.mongoose = require('mongoose');
        this.endpoint = `mongodb://dbTeste:dbTeste@sandbox-shard-00-00-hzuik.azure.mongodb.net:27017,
                        sandbox-shard-00-01-hzuik.azure.mongodb.net:27017,
                        sandbox-shard-00-02-hzuik.azure.mongodb.net:27017/test?ssl=true&replicaSet=Sandbox-shard-0&authSource=admin&retryWrites=true&w=majority`;
        this.mongoose.Promise = global.Promise;
        this.param = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
        this.logger = LoggerFactory.getLogger();
        this.connect()
    }

    connect() {
        this.logger.info('[MONGODB] Conectando à base de dados...')
        return new Promise((resolve, reject) => {
            this.mongoose.connect(this.endpoint, this.param)
            this.mongoose.connection.on('connected', () => {
                this.logger.info('[MONGODB] Conexão estabelecida com sucesso!')
                resolve()
            });
            this.mongoose.connection.on('error', (err) => {
                this.logger.err('[MONGODB] Erro: ' + err);
                reject();
            });
        })
    }

    getMongoDB() {
        return this.mongoose;
    }
}