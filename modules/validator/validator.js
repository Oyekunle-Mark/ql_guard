const Types = require('./types');

class Validator {
  #creditCardRepository;

  constructor(creditCardRepository) {
    this.#creditCardRepository = creditCardRepository;

    this.validate = this.validate.bind(this);
  }

  validate(requestBody, validatorInput) {
    this.checkAllKeys(validatorInput);

    const errors = {};
    let valid = true;

    Object.keys(validatorInput).forEach((key) => {
      const keyInput = requestBody[key];

      if (!keyInput) {
        valid = false;
        errors[key] = `${key} is required`;
      } else {
        if (!this.check(validatorInput[key], keyInput)) {
          valid = false;
          errors[
            key
          ] = `${key} provided is an invalid ${validatorInput[key]} type`;
        }
      }
    });

    return {
      valid,
      errors,
    };
  }

  checkAllKeys(input) {
    Object.values(input).forEach((value) => {
      if (!Object.values(Types).includes(value))
        throw new Error(
          `Invalid validator field value ${values} provided to validator`,
        );
    });
  }

  check(type, value) {
    switch (type) {
      case Types.CARD_NUMBER:
        return this.__validateCardNumber(value);
      case Types.CARD_DATE:
        return this.#validateCardDate(value);
      case Types.CVV2:
        return this.#validateCVV2(value);
      case Types.EMAIL:
        return this.#validateEmail(value);
      case Types.MOBILE_NUMBER:
        return this.#validateMobileNumber(value);
      default:
        throw new Error(`Invalid key ${type} provided to validator`);
    }
  }

  __validateCardNumber(value) {
    return this.#creditCardRepository.validateCreditCardNumber(value);
  }

  #validateCardDate(value) {
    const regEx = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    return regEx.test(value);
  }

  #validateCVV2(value) {
    const regEx = /^([0-9]{3})$/;
    return regEx.test(value);
  }

  #validateEmail(value) {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(value);
  }

  #validateMobileNumber(value) {
    const regEx = /^[0]\d{10}$/;
    return regEx.test(value);
  }

  isXML(req) {
    const type = req.headers['content-type'];

    return type === 'application/xml';
  }
}

module.exports = Validator;
