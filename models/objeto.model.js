module.exports = new class ObjectModel {
    constructor(name = "Objeto") {
        const mongoose = require('mongoose');
        this.schema = mongoose.Schema;
        this.objectName = name
        this.model = mongoose.model(this.objectName, this.getSchema())
    }

    getModel() {
        return this.model;
    }

    getSchema() {
        return new this.schema({
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: false }
        });
    }
}