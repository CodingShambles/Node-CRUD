module.exports = class LogConfig {
    static getConfig() {
        return {
            logFilePath: './outputs/server.log',
            timestampFormat: 'DD-MM-YYYY HH:mm:ss.SSS'
        }
    }
}