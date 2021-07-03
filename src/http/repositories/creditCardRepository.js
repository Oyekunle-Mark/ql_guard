class CreditCardRepository {
  static luhnAlgorithm(cardNumber) {
    cardNumber = cardNumber.replace(/[ -]/g, '');

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

  static validateCardNumber(cardNumber) {
    cardNumber = cardNumber.replace(/[ -]/g, '');

    return /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.exec(
      cardNumber,
    );
  }

  static findCardType(cardNumber) {
    cardNumber = cardNumber.replace(/[ -]/g, '');

    const match =
      /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.exec(
        cardNumber,
      );

    const types = [
      'Visa',
      'MasterCard',
      'Discover',
      'American Express',
      'Diners Club',
      'JCB',
    ];

    if (match) {
      for (let i = 1; i < match.length; i++) {
        if (match[i]) {
          return types[i - 1];
        }
      }
    } else {
      throw new Error('Invalid card number provided');
    }
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

    let angledValue = result[1];
    angledValue = angledValue.split('</')[0]
    let value = '';

    for (let i = 0; i < angledValue.length; i++) {
      if (!['<', '>'].includes(angledValue.charAt(i)))
        value += angledValue.charAt(i);
    }

    return value;
  }
}

module.exports = CreditCardRepository;
