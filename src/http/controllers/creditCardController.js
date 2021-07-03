const { Types } = require('../../../modules/validator');

/**
 * Credit card related controllers
 */
class CreditCardController {
  #creditCardRepository;
  #validator;

  constructor(creditCardRepository, validator) {
    this.#creditCardRepository = creditCardRepository;
    this.#validator = validator;

    this.validate = this.validate.bind(this);
  }

  /**
   * Validate request payload
   *
   * @param {Object} req
   * @param {Object} res
   */
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

      if (result.valid) {
        const message = {};
        message['card_type'] = this.#creditCardRepository.findCardType(
          reqBody.card_number,
        );

        if (reqBody.mobile_number) {
          message['mobile_number_country'] =
            this.#validator.isNigerianMobileNumber(reqBody.mobile_number)
              ? 'Nigerian'
              : 'Foreign';
        }

        result.message = message;
        delete result.errors;
      }

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    });
  }
}

module.exports = CreditCardController;
