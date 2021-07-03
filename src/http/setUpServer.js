const http = require('http');
const { CreditCardController, CommonController } = require('./controllers');
const { CreditCardRepository } = require('./repositories');
const Middlewares = require('./middlewares');
const { Validator } = require('../../modules/validator');
const Router = require('../../modules/router');

/**
 * The validator HTTP server
 */
class Server {
  #host;
  #port;
  #server;

  constructor(host, port) {
    this.#host = host;
    this.#port = port;
  }

  /**
   * Builds the server and it's dependencies
   *
   * @returns this
   */
  build() {
    const validator = new Validator(CreditCardRepository);
    const creditCardController = new CreditCardController(
      CreditCardRepository,
      validator,
    );

    const router = new Router();
    router.register('/', creditCardController.validate);
    router.registerNotFoundHandler(CommonController.notFound);
    router.addMiddleware(Middlewares.enforceRequestBodyType);
    router.addMiddleware(Middlewares.validateApiKey);

    this.#server = http.createServer(router.findControllerAndServe);

    return this;
  }

  /**
   * Start server
   */
  serve() {
    this.#server.listen(this.#port, this.#host, () => {
      console.log(`Server is running on http://${this.#host}:${this.#port}`);
    });
  }
}

module.exports = Server;
