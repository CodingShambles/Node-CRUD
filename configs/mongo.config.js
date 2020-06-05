module.exports = class MongoConfig {
    static getConfig() {
        return {
            user: 'teste',
            pass: 'teste',
            ip: '127.0.0.1',
            port: '27017',
            database: 'myApp'
        }
    }
}