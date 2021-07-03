const http = require('http');
const { CreditCardController, CommonController } = require('./controllers');
const { CreditCardRepository } = require('./repositories');
const { Validator } = require('../../modules/validator');
const Router = require('../../modules/router');

class Server {
  #host;
  #port;
  #server;

  constructor(host, port) {
    this.#host = host;
    this.#port = port;
  }

  build() {
    const validator = new Validator(CreditCardRepository);
    const creditCardController = new CreditCardController(validator);

    const router = new Router();
    router.register('/', creditCardController.validate);
    router.registerNotFoundHandler(CommonController.notFound);

    this.#server = http.createServer(router.findControllerAndServe);

    return this;
  }

  serve() {
    this.#server.listen(this.#port, this.#host, () => {
      console.log(`Server is running on http://${this.#host}:${this.#port}`);
    });
  }
}

module.exports = Server;
