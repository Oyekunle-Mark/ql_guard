const http = require('http');
const { CreditCardController } = require('./src/http/controllers');

const host = 'localhost';
const port = 8000;

const server = http.createServer(CreditCardController.validate);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
