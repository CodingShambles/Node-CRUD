module.exports = class ObjetoDocs {
    getOne() {
        /**
         * @swagger
         *
         * /api/objetos/{name}:
         *   get:
         *     description: Busca um objeto que contenha o nome passado como parâmetro
         *     tags: [CRUD Objeto]
         *     produces:
         *       - application/json*       
         *     parameters:
         *       - name: name
         *         description: Nome do usuario
         *         type: string
         *         required: true
         *         in: path
         *     responses:
         *       200:
         *         description: Retorna o objeto buscado
         *         schema:
         *           type: object
         *           properties:
         *             _id:
         *                type: string
         *             name:
         *                type: string
         *             price:
         *                type: number
         *             quantity:
         *                type: number
         *       400:
         *          description: Não foi encontrado um objeto com o parâmetro informado
         *       500:
         *          description: Falha na comunicação com o banco de dados
         */
    }

    getAll() {
        /**
         * @swagger
         *
         * /api/objetos:
         *   get:
         *     description: Busca todos os objetos cadastrados
         *     tags: [CRUD Objeto]
         *     produces:
         *       - application/json*       
         *     responses:
         *       '200':
         *         description: Retorna a lista de objetos existentes
         *         schema:
         *           type: array
         *           items: 
         *             type: object
         *             properties:
         *               _id:
         *                  type: string
         *               name:
         *                  type: string
         *               price:
         *                  type: number
         *               quantity:
         *                  type: number
         *       400:
         *          description: Não existem objetos na base de dados
         *       '500':
         *         description: Falha na comunicação com o banco de dados
         */
    }

    post() {
        /**
         * @swagger
         *
         * /api/objetos:
         *   post:
         *     description: Insere um objeto na base de dados
         *     tags: [CRUD Objeto]
         *     produces:
         *       - application/json*       
         *     parameters:
         *       - name: objeto
         *         description: Objeto para ser inserido
         *         schema:
         *           type: object
         *           properties:
         *             name:
         *               type: string
         *               required: true
         *             price:
         *               type: number
         *               required: true
         *             quantity:
         *               type: number
         *               required: true
         *         in: body
         *     responses:
         *       200:
         *         description: Objeto gravado com sucesso.
         *         schema:
         *           type: object
         *           required:
         *             - name
         *             - price
         *             - quantity
         *           properties:
         *             sucesso:
         *               type: string
         *               value: 'O registro foi gravado com sucesso.'
         *             dados:
         *               type: object
         *               properties:
         *                 name:
         *                   type: string
         *                 price:
         *                   type: number
         *                 quantity:
         *                   type: number
         *       500:
         *         description: Falha na comunicação com o banco de dados.
         */

    }

    put() {
        /**
         * @swagger
         *
         * /api/objetos:
         *   put:
         *     description: Login to the application
         *     tags: [CRUD Objeto]
         *     produces:
         *       - application/json*       
         *     parameters:
         *       - name: objeto
         *         description: Contem o identificador do objeto que será atualizado, e os dados que serão modificados.
         *         schema:        
         *           type: object
         *           properties:
         *             filter:
         *               type: object
         *               properties:
         *                 name:
         *                   type: string
         *                   required: true
         *             update:
         *               type: object
         *               properties:
         *                 price:
         *                   type: number
         *                 quantity:
         *                   type: number
         *         required: true
         *         in: body
         *     responses:
         *       200:
         *         description: Registro atualizado com sucesso.
         *         schema:
         *           type: object
         *           required:
         *             - name
         *             - price
         *             - quantity
         *           properties:
         *             sucesso:
         *               type: string
         *               value: 'O registro foi alterado.'
         *             dados:
         *               type: object
         *               properties:
         *                 name:
         *                   type: string
         *                 price:
         *                   type: number
         *                 quantity:
         *                   type: number
         *       400:
         *         description: Não foi encontrado um objeto com o parâmetro informado
         *       500:
         *         description: Falha na comunicação com o banco de dados.
         */

    }


    delete() {
        /**
         * @swagger
         *
         * /api/objetos:
         *   delete:
         *     description: Login to the application
         *     tags: [CRUD Objeto]
         *     produces:
         *       - application/json*       
         *     parameters:
         *       - name: name
         *         description: Nome do usuario que será removido
         *         schema:        
         *           type: object
         *           properties:
         *             name:
         *               type: string
         *         in: body
         *     responses:
         *       200:
         *         description: Objeto removido com sucesso.
         *         schema:
         *           type: object
         *           required:
         *             - name
         *             - price
         *             - quantity
         *           properties:
         *             sucesso:
         *               type: string
         *               value: 'O registro foi gravado com sucesso.'
         *             dados:
         *               type: object
         *               properties:
         *                 name:
         *                   type: string
         *                 price:
         *                   type: number
         *                 quantity:
         *                   type: number
         *       400:
         *         description: Não foi encontrado um objeto com o parâmetro informado
         *       500:
         *         description: Falha na comunicação com o banco de dados.
         */
    }
}