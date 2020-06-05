module.exports = class JasmineConfig {
    static getConfig() {
        return {
            "spec_dir": "spec",
            "spec_files": [
                "../spec/*[sS]pec.js"
            ],
            "stopSpecOnExpectationFailure": false,
            "random": false
        }
    }
}