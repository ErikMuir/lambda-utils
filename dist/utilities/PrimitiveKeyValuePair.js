"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PrimitiveKeyValuePair {
  constructor(_key, _value) {
    _defineProperty(this, "_validateKey", key => {
      if (typeof key !== 'string') {
        throw new TypeError('Keys must be of type string');
      }
    });

    _defineProperty(this, "_validateValue", value => {
      if (!this._allowedTypes.includes(typeof value)) {
        throw new TypeError('Values must be of type string, number, or boolean');
      }
    });

    this._allowedTypes = ['string', 'number', 'boolean'];

    this._validateKey(_key);

    this._validateValue(_value);

    this._key = _key;
    this._value = _value;
  }

  get key() {
    return this._key;
  }

  set key(newValue) {
    throw new Error('Keys are read-only');
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._validateValue(newValue);

    this._value = newValue;
  }

}

exports.default = PrimitiveKeyValuePair;
//# sourceMappingURL=PrimitiveKeyValuePair.js.map