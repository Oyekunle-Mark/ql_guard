class CreditCardRepository {
  validateCreditCardNumber(cardNumber) {
    const numberLength = cardNumber.length;
    let sum = 0;
    let isEven = false;

    for (let i = numberLength - 1; i >= 0; i--) {
      let currentNumber = parseInt(value.charAt(i), 10);

      if (isEven) {
        currentNumber *= 2;

        if (currentNumber > 9) currentNumber -= 9;
      }

      sum += currentNumber;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }
}
