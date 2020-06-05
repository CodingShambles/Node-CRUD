module.exports = class AppConfig {
    static getConfig() {
        return {
            server: {
                ip: '127.0.0.1',
                port: '80',
            }
        }
    }
}