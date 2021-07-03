const { Types } = require('../../../modules/validator');

class CreditCardController {
  #validator;

  constructor(validator) {
    this.#validator = validator;

    this.validate = this.validate.bind(this);
  }

  validate(req, res) {
    const type = req.headers['content-type'];
    const acceptedTypes = new Set(['application/json', 'application/xml']);

    if (!acceptedTypes.has(type)) {
      console.log(req.headers);
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(422);
      res.end(`{"error": "Invalid format provided"}`);
      return;
    }

    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      let reqBody;

      try {
        reqBody = JSON.parse(data);
      } catch (e) {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(422);
        res.end(`{"error": "Invalid request body"}`);
        return;
      }

      const result = this.#validator.validate(reqBody, {
        card_number_input: Types.CARD_NUMBER,
      });

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(JSON.stringify(result));
    });
  }
}

module.exports = CreditCardController;
