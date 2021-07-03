const url = require('url');

class Router {
  #paths;
  #notFoundHandler;

  constructor() {
    this.#paths = new Map();

    this.findControllerAndServe = this.findControllerAndServe.bind(this);
  }

  register(path, controller) {
    this.#paths.set(path, controller);
  }

  registerNotFoundHandler(controller) {
    this.#notFoundHandler = controller;
  }

  findControllerAndServe(req, res) {
    const pathname = url.parse(req.url).pathname;
    const controller = this.#paths.get(pathname);

    if (!controller || req.method !== 'POST') {
      if (!this.notFoundHandler) {
        throw new Error('Not found handler not registered');
      }

      this.#notFoundHandler(req, res);
      return;
    }

    controller(req, res);
  }
}

module.exports = Router;
