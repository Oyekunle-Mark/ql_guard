class CommonController {
  static notFound(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(404);
    res.end(`{"error": "Not found"}`);
    return;
  }
}

module.exports = CommonController;
