class CreditCardRepository {
  static validateCreditCardNumber(cardNumber) {
    const numberLength = cardNumber.length;
    let sum = 0;
    let isEven = false;

    for (let i = numberLength - 1; i >= 0; i--) {
      let currentNumber = parseInt(cardNumber.charAt(i), 10);

      if (isEven) {
        currentNumber *= 2;

        if (currentNumber > 9) currentNumber -= 9;
      }

      sum += currentNumber;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  static buildToObject(xmlString, validatorInput) {
    const result = {};

    const expectedStart = `<?xml version="1.0" encoding="UTF-8" ?>`;

    if (!xmlString.startsWith(expectedStart)) {
      throw new Error(`XML input must start with ${expectedStart}`);
    }

    Object.values(validatorInput).forEach((key) => {
      const tagValue = this.extractTagValue(xmlString, key);

      if (tagValue) {
        result[key] = tagValue;
      }
    });

    return result;
  }

  static extractTagValue(xmlString, tagName) {
    const result = xmlString.split(tagName);

    if (result.length !== 3) return null;

    const angledValue = result[1];
    let value = '';

    for (let i = 0; i < angledValue.length; i++) {
      if (!['<', '>', '/'].includes(angledValue.charAt(i)))
        value += angledValue.charAt(i);
    }

    return value;
  }
}

module.exports = CreditCardRepository;
