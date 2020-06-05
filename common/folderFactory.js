module.exports = new class FolderFactory {
    constructor() {
        this.fs = require('fs');
    }

    async createFolder(path) {
        return new Promise((resolve, reject) => {
            try {
                if (!this.fs.existsSync(path)) {
                    this.fs.mkdirSync(path);
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (e) {
                reject(e);
            }
        })
    }
}