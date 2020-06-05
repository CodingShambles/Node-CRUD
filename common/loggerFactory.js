module.exports = new class LoggerFactory {
    constructor() {
        const logConfig = require('../configs/log.config').getConfig();

        this.FolderFactory = require('../common/folderFactory')
        this.createFolder()
        this.Logger = require('simple-node-logger').createSimpleLogger(logConfig);
    }

    createFolder() {
        this.FolderFactory.createFolder('./outputs')
    }

    getLogger() {
        return this.Logger;
    }
}