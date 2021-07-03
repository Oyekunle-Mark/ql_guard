const { Types } = require('../../../modules/validator');

class CreditCardController {
  #creditCardRepository;
  #validator;

  constructor(creditCardRepository, validator) {
    this.#creditCardRepository = creditCardRepository;
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

      const validatorExpects = {
        card_number: Types.CARD_NUMBER,
        card_date: Types.CARD_DATE,
        cvv2: Types.CVV2,
        email: Types.EMAIL,
        mobile_number: Types.MOBILE_NUMBER,
      };

      try {
        reqBody = this.#validator.isXML(req)
          ? this.#creditCardRepository.buildToObject(data, validatorExpects)
          : JSON.parse(data);
      } catch (e) {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(422);
        res.end(`{"error": "Invalid request body: ${e.message}"}`);
        return;
      }

      const result = this.#validator.validate(reqBody, validatorExpects);

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    });
  }
}

module.exports = CreditCardController;
