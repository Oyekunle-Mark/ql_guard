const url = require('url');

class Router {
  #paths = new Map();

  register(path, controller) {
    this.#paths.set(path, controller);
  }

  registerNotFoundHandler(controller) {
    this.notFoundHandler = controller;
  }

  retrieveController(path) {
    return this.#paths.get(path);
  }

  findControllerAndServe(req, res) {
    const pathname = url.parse(request.url).pathname;
    const controller = this.#paths.get(pathname);

    if (!controller) {
      if (!this.notFoundHandler) {
        throw new Error('Not found handler not registered');
      }

      this.notFoundHandler(req, res);
      return
    }

    controller(req, res);
  }
}

module.exports = Router;
