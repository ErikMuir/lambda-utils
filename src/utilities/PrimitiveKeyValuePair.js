export default class PrimitiveKeyValuePair {
  constructor(key, value) {
    this._allowedTypes = ['string', 'number', 'boolean'];
    this._validateKey(key);
    this._validateValue(value);

    this._key = key;
    this._value = value;
  }

  get key() { return this._key; }
  set key(newValue) { throw new Error('Keys are read-only'); }

  get value() { return this._value; }
  set value(newValue) {
    this._validateValue(newValue);
    this._value = newValue;
  }

  _validateKey = key => {
    if (typeof key !== 'string') {
      throw new TypeError('Keys must be of type string');
    }
  };

  _validateValue = value => {
    if (!this._allowedTypes.includes(typeof value)) {
      throw new TypeError('Values must be of type string, number, or boolean');
    }
  };
}
