# NodeAPI Template

### O que é?
Um template para o desenvolvimento de APIs em [Node.js](http://nodejs.org/) utilizando  [MongoDB](https://www.mongodb.com/)

### Características
1. Código orientado a objetos, utilizando o conceito de *Classes*
2. Funções que possuem comportamento assincrono retornam *Promisses*, as quais são tratadas utilizando o conceito de *Async/Await*
3. Utiliza o padrão de projetos *MVC*
4. A *API *é documentada seguindo a notação [Swagger](https://swagger.io/docs/)
5. São realizados testes unitários na *API* com a ferramenta [Jasmine](https://jasmine.github.io/)
6. Tanto a documentação quando os testes geram relatórios, os quais são acessíveis através de páginas web nos respectivos endpoints: ***/api-docs*** e ***/api-tests***

### Estrutura


├── Raiz

│   ├── common -- classes que são utilizadas por diversos módulos, como gerenciar o log ou conectar ao banco

│   ├── configs -- classes que armazenam as configurações específicas, p.ex.: onde o log será armazenado

│   ├── models -- classes que especificam um modelo de negócio

│   ├── controllers -- classes que gerenciam um model, p.ex.: realizando o CRUD

│   ├── routes -- classes que definem as rotas que o servidor deve responder

│   ├── docs -- classes que documentam a API, utilizando a notação Swagger

│   ├── ouputs -- armazenam os arquivos gerados pelo servidor, como o Log e o relatório de teste

│   ├── public -- pasta onde são armazenados arquivos públicos

│   ├── server -- classe que determina toda a rotina de inicialização do servidor

│   ├── specs --  classes que especificam os testes unitários para serem aplicados no Jasmine

│   ├── views -- pasta que armazena os arquivos EJS da view

│   │   ├── partials -- armazena trechos da view, p.ex.: uma navbar

│   │   ├── pages -- armazena uma página completa da view, que pode reutilizar trechos armazenados em 'partials'

│   └── app.js	-- responsável por instanciar e inicializar o servidor de aplicação


### Como utilizar?
#### Para Instalar:
**Pré-requisitos**: instalar os pacotes [npm](https://www.npmjs.com/get-npm) e [MongoDB](https://www.mongodb.com/download-center/community)

Após a instalação, basta rodar o comando:

	 npm install
	
Após todas as dependências terem sido baixadas, basta editar o arquivo **mongo.config.js**, localizado na pasta **configs**, fornecendo as informações de acesso à sua base de dados. 
Neste exemplo, o banco de dados está localizado em minha máquina local (127.0.0.1), escutando a porta 27017. Além disso, também criei o usuário **teste** com permissão de leitura e escrita na base de dados **myApp**. Sendo assim, a classe de configuração ficou da seguinte forma:

	module.exports = class MongoConfig {
		static getConfig(){
			return {
			    user: 'teste',
			    pass: 'teste',
			    ip: '127.0.0.1',
			    port: '27017',
			    database: 'myApp'
			}
		    }
		}

#### Utlizar em desenvolvimento
Neste modo o servidor será executado utilizando o *nodemon*, um módulo que irá monitorar todas as alterações nos arquivos da aplicação e reiniciar automaticamente o servidor quando for necessário

**Pré-requisito**:  [nodemon](https://www.npmjs.com/package/nodemon)

	 npm run dev

#### Utilizar em produção
Neste modo o servidor será executado normalmente.

	npm run prod
	
#### Acessar a página
Se tudo ocorreu bem, você deve ver a home ao acessar o endereço [http://127.0.0.1](http://127.0.0.1) ou [http://localhost](http://localhost) no seu navegador de preferência
