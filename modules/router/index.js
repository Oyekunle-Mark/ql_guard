const url = require('url');

class Router {
  #paths;
  #notFoundHandler;
  #middlewares;

  constructor() {
    this.#paths = new Map();
    this.#middlewares = [];

    this.findControllerAndServe = this.findControllerAndServe.bind(this);
  }

  register(path, controller) {
    this.#paths.set(path, controller);
  }

  registerNotFoundHandler(controller) {
    this.#notFoundHandler = controller;
  }

  addMiddleware(middleware) {
    this.#middlewares.push(middleware);
  }

  #executeMiddlewares(req, res, shouldTerminate) {
    this.#middlewares.forEach((middleware) => {
      middleware(req, res, shouldTerminate);
    });
  }

  findControllerAndServe(req, res) {
    const shouldTerminate = { terminate: false };

    this.#executeMiddlewares(req, res, shouldTerminate);

    if (shouldTerminate.terminate) return;

    const pathname = url.parse(req.url).pathname;
    const controller = this.#paths.get(pathname);

    if (!controller || req.method !== 'POST') {
      if (!this.#notFoundHandler) {
        throw new Error('Not found handler not registered');
      }

      this.#notFoundHandler(req, res);
      return;
    }

    controller(req, res);
  }
}

module.exports = Router;
