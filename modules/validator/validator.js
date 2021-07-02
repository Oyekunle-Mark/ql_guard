const Types = require('./types');

class Validator {
  static validate(requestBody, validatorInput) {
    this.checkAllKeys(validatorInput);

    const message = {};
    const valid = true;

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

  static checkAllKeys(input) {
    Object.values(input).forEach((key) => {
      if (!Types.hasOwnProperty(key))
        throw new Error(`Invalid key ${key} provided to validator`);
    });
  }

  static check(type, value) {
    switch (type) {
      case Types.CARD_NUMBER:
        return true;
      case Types.CARD_DATE:
        return true;
      case Types.CVV2:
        return true;
      case Types.EMAIL:
        return true;
      case Types.MOBILE_NUMBER:
        return true;
      default:
        throw new Error(`Invalid key ${type} provided to validator`);
    }
  }
}

module.exports = Validator;
