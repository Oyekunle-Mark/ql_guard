const fs = require('fs');

class Config {
  #variables;

  constructor() {
    this.#variables = new Map();
  }

  initiate(filePath) {
    const data = fs.readFileSync(filePath, {
      encoding: 'utf8',
      flag: 'r',
    });

    data
      .trim()
      .split('\n')
      .forEach((line) => {
        const [variable, value] = line.split('=');
        this.#variables.set(variable, value.replace(/['"]+/g, ''));
      });
  }

  get(variable) {
    return this.#variables.get(variable);
  }
}

module.exports = Config;
