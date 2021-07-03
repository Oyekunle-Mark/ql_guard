const Types = require('./types');

class Validator {
  #creditCardRepository;

  constructor(creditCardRepository) {
    this.#creditCardRepository = creditCardRepository;

    this.validate = this.validate.bind(this);
    // this.check = this.check.bind(this);
    // this.__validateCardNumber = this.__validateCardNumber.bind(this);
  }

  validate(requestBody, validatorInput) {
    this.checkAllKeys(validatorInput);

    const message = {};
    let valid = true;

    Object.keys(validatorInput).forEach((key) => {
      const keyInput = requestBody[key];

      if (!keyInput) {
        valid = false;
        message[key] = `${key} is required`;
      } else {
        const isValid = this.check(validatorInput[key], keyInput);

        valid = isValid;
        !isValid &&
          (message[
            key
          ] = `${key} provided is an invalid ${validatorInput[key]} type`);
      }
    });

    return {
      valid,
      message,
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
}

module.exports = Validator;
