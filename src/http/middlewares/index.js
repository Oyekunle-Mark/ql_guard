class Middlewares {
  static enforceRequestBodyType(req, res, shouldTerminate) {
    const type = req.headers['content-type'];
    const acceptedTypes = new Set(['application/json', 'application/xml']);

    if (!acceptedTypes.has(type)) {
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(422);
      res.end(
        `{"error": "Invalid format provided. Content-Type in the request header can only be set to any of 'application/json' or 'application/xml'"}`,
      );

      shouldTerminate.terminate = true;
    }
  }
}

module.exports = Middlewares;
