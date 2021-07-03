const { Types } = require('../../../modules/validator');

class CreditCardController {
  #validator;

  constructor(validator) {
    this.#validator = validator;

    this.validate = this.validate.bind(this);
  }

  validate(req, res) {
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
        card_number: Types.CARD_NUMBER,
        date: Types.CARD_DATE,
        cvv2: Types.CVV2,
        email: Types.EMAIL,
        mobile: Types.MOBILE_NUMBER,
      });

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return
    });
  }
}

module.exports = CreditCardController;
