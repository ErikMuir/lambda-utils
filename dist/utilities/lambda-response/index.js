"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _header = _interopRequireDefault(require("../header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LambdaResponse {
  constructor() {
    this._statusCode = 200;
    this._headers = {};
    this._body = {};
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
    const isHeader = header instanceof _header.default;

    if (!isHeader) {
      throw new TypeError('header must be of type Header');
    }

    this._headers[header.key] = header.value;
  }

  build() {
    return {
      statusCode: this._statusCode,
      headers: this._headers,
      body: JSON.stringify(this._body)
    };
  }

}

exports.default = LambdaResponse;
//# sourceMappingURL=index.js.map