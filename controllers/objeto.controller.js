module.exports = new class ObjetoController {
    constructor() {
        const LoggerFactory = require('../common/loggerFactory');
        this.mongo = require('../common/mongoConnector');
        this.model = require('../models/objeto.model');
        this.logger = LoggerFactory.getLogger()
    }

    add = async function(req, res) {
        return new Promise((resolve, reject) => {
            var Schema = this.model.getModel()
            var data = new Schema(req.body);
            data.save((err, obj) => {
                if (err) {
                    res.status(500)
                    res.send({
                        erro: err
                    })
                    reject()
                } else {
                    res.status(200)
                    res.send({
                        sucesso: "O registro foi gravado com sucesso.",
                        dados: obj
                    })
                    resolve()
                }
            });
        }).then(() => {
            this.logger.info('[POST /api/objetos] a requisição foi realizada com sucesso')
        }).catch(() => {
            this.logger.warn('[POST /api/objetos] a requisição falhou.')
        })
    }.bind(this)

    search = async function(req, res) {
        let id = req.params.id;
        return new Promise((resolve, reject) => {
            var schema = this.model.getModel()
            schema.findOne({ name: id }, (err, doc) => {
                if (err) {
                    res.status(500);
                    res.send({
                        erro: err
                    });
                    reject()
                } else {
                    if (doc) {
                        res.status(200);
                        res.send(doc);
                        resolve()
                    } else {
                        res.status(400)
                        res.send({
                            erro: "Não foi encontrado um registro com o parâmetro informado"
                        })
                        resolve()
                    }
                }
            });
        }).then(() => {
            this.logger.info(`[GET /api/objetos/${id}] a requisição foi realizada com sucesso`)
        }).catch(() => {
            this.logger.warn(`[GET /api/objetos/${id}] a requisição falhou.`)
        })
    }.bind(this)

    searchAll = async function(req, res) {
        return new Promise((resolve, reject) => {
            let schema = this.model.getModel()
            schema.find(null, function(err, doc) {
                if (err) {
                    res.status(500);
                    res.send({
                        erro: err
                    });
                    reject()
                } else {
                    if (doc) {
                        res.status(200);
                        res.send(doc);
                        resolve();
                    } else {
                        res.status(500);
                        res.send({
                            erro: "Não foi encontrado nenhum registro."
                        });
                        resolve()
                    }

                }
            });
        }).then(() => {
            this.logger.info('[GET /api/objetos] a requisição foi realizada com sucesso')
        }).catch(() => {
            this.logger.warn('[GET /api/objetos] a requisição falhou.')
        })
    }.bind(this)

    delete = async function(req, res) {
        return new Promise((resolve, reject) => {
            let id = req.body.name;
            let schema = this.model.getModel()
            schema.findOneAndDelete({ name: id }, function(err, doc) {
                if (err) {
                    res.status(500);
                    res.send({
                        erro: err
                    });
                    reject();
                } else {
                    if (doc) {
                        res.status(200);
                        res.send({
                            sucesso: "O registro foi removido.",
                            dados: doc
                        });
                        resolve()
                    } else {
                        res.status(400)
                        res.send({
                            erro: "Não foi encontrado um registro com o parâmetro informado"
                        })
                        resolve()
                    }

                }
            })
        }).then(() => {
            this.logger.info('[DELETE /api/objetos] a requisição foi realizada com sucesso')
        }).catch(() => {
            this.logger.warn('[DELETE /api/objetos] a requisição falhou.')
        })
    }.bind(this)


    update = async function(req, res) {
        return new Promise((resolve, reject) => {
            let filter = req.body.filter;
            let update = req.body.update;
            let schema = this.model.getModel()
            schema.findOneAndUpdate(filter, update, (err, doc) => {
                if (err) {
                    res.status(500)
                    res.send({
                        erro: err
                    })
                    reject()
                } else {
                    if (doc) {
                        Object.entries(update).forEach((elemento) => {
                            doc[elemento[0]] = elemento[1];
                        });

                        res.status(200)
                        res.send({
                            sucesso: "O registro foi alterado.",
                            dados: doc
                        })
                        resolve();
                    } else {
                        res.status(400)
                        res.send({
                            erro: "Não foi encontrado um registro com o parâmetro informado"
                        })
                        resolve()
                    }

                }
            });
        }).then(() => {
            this.logger.info('[PUT /api/objetos] a requisição foi realizada com sucesso')
        }).catch(() => {
            this.logger.warn('[PUT /api/objetos] a requisição falhou.')
        })
    }.bind(this)
}