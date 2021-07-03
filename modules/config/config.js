const fs = require('fs');

/**
 * The configuration class
 */
class Config {
  #variables;

  constructor() {
    this.#variables = new Map();
  }

  /**
   * Bootstrap the env variables
   *
   * @param {String} filePath the path to the env file
   */
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

  /**
   * Retrieves the value of an env variable
   *
   * @param {String} variable the key of the variable
   * @returns String
   */
  get(variable) {
    return this.#variables.get(variable);
  }
}

module.exports = Config;
