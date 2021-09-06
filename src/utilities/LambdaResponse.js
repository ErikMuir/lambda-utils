const { Header, PrimitiveMap } = require('@erikmuir/node-utils');

module.exports = class LambdaResponse {
  constructor() {
    this._isBase64Encoded = false;
    this._statusCode = 200;
    this._headers = new PrimitiveMap();
    this._body = null;
  }

  get isBase64Encoded() { return this._isBase64Encoded; }
  set isBase64Encoded(newValue) { this._isBase64Encoded = !!newValue ;}

  get statusCode() { return this._statusCode; }
  set statusCode(newStatusCode) { this._statusCode = newStatusCode; }

  get body() { return this._body; }
  set body(newBody) { this._body = newBody; }

  get headers() { return this._headers; }
  addHeader(header) {
    const isHeader = header instanceof Header;
    if (!isHeader) {
      throw new TypeError('header must be of type Header');
    }
    this._headers.set(header);
  }
  addHeaders(headers) {
    if (
      headers === null
      || typeof headers !== 'object'
      || Array.isArray(headers)
    ) {
      throw new TypeError('headers must be an object');
    }
    Object
      .keys(headers)
      .map((key) => new Header(key, headers[key]))
      .forEach((header) => this._headers.set(header));
  }

  build() {
    return {
      isBase64Encoded: this._isBase64Encoded,
      statusCode: this._statusCode,
      headers: this._headers.toObject(),
      body: this._getBody(),
    };
  }

  _getBody = () => {
    if (this._body === null || this._body === undefined) {
      return null;
    } else if (this._isBase64Encoded) {
      return this._body;
    } else {
      return JSON.stringify(this._body);
    }
  }
}
