module.exports = new class ObjetoRoute {
    constructor() {
        const express = require('express');
        this.router = express.Router();
        this.controller = require('../controllers/objeto.controller');
        this.defineRoutes()
    }

    defineRoutes() {
        this.router.get('/:id', this.controller.search);
        this.router.get('/', this.controller.searchAll);
        this.router.post('/', this.controller.add);
        this.router.put('/', this.controller.update);
        this.router.delete('/', this.controller.delete);
    }

    getRoutes() {
        return this.router
    }
}