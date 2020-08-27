"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Header = _interopRequireDefault(require("./Header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class LambdaResponse {
  constructor() {
    _defineProperty(this, "_getBody", () => {
      if (this._body === null || this._body === undefined) {
        return null;
      } else if (this._isBase64Encoded) {
        return this._body;
      } else {
        return JSON.stringify(this._body);
      }
    });

    this._isBase64Encoded = false;
    this._statusCode = 200;
    this._headers = {};
    this._body = null;
  }

  get isBase64Encoded() {
    return this._isBase64Encoded;
  }

  set isBase64Encoded(newValue) {
    this._isBase64Encoded = !!newValue;
  }

  get statusCode() {
    return this._statusCode;
  }

  set statusCode(newStatusCode) {
    this._statusCode = newStatusCode;
  }

  get body() {
    return this._body;
  }

  set body(newBody) {
    this._body = newBody;
  }

  get headers() {
    return this._headers;
  }

  addHeader(header) {
    const isHeader = header instanceof _Header.default;

    if (!isHeader) {
      throw new TypeError('header must be of type Header');
    }

    this._headers[header.key] = header.value;
  }

  build() {
    return {
      isBase64Encoded: this._isBase64Encoded,
      statusCode: this._statusCode,
      headers: this._headers,
      body: this._getBody()
    };
  }

}

exports.default = LambdaResponse;
//# sourceMappingURL=LambdaResponse.js.map