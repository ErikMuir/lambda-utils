export default class Header {
  constructor(key, value) {
    if (typeof key !== 'string') {
      throw new TypeError('Header keys must be of type string');
    }

    if (!['string', 'number', 'boolean'].includes(typeof value)) {
      throw new TypeError('Header values must be of type string, number, or boolean');
    }

    this.key = key;
    this.value = value;
  }
}
