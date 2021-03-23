const LambdaResponse = require('../../src/utilities/LambdaResponse');
const { Header, PrimitiveMap, testUtils: { expectError } } = require('@erikmuir/node-utils');

describe('Response', () => {
  const defaultStatusCode = 200;
  const defaultIsBase64Encoded = false;
  const defaultHeaders = new PrimitiveMap();
  const defaultBody = null;

  describe('constructor', () => {
    const actual = new LambdaResponse();

    test('sets default statusCode', () => {
      expect(actual.statusCode).toBe(defaultStatusCode);
    });

    test('sets default isBase64Encoded', () => {
      expect(actual.isBase64Encoded).toBe(defaultIsBase64Encoded);
    });

    test('sets default headers', () => {
      expect(actual.headers).toEqual(defaultHeaders);
    });

    test('sets default body', () => {
      expect(actual.body).toEqual(defaultBody);
    });
  });

  describe('addHeader method', () => {
    let lambdaResponse;

    beforeEach(() => {
      lambdaResponse = new LambdaResponse();
    });

    test('appends to headers', () => {
      lambdaResponse.addHeader(new Header('foo', 'bar'));
      expect(lambdaResponse.headers.toObject()).toEqual({ foo: 'bar' });

      lambdaResponse.addHeader(new Header('baz', 42));
      expect(lambdaResponse.headers.toObject()).toEqual({ foo: 'bar', baz: 42 });
    });

    test('overwrites header with same key', () => {
      lambdaResponse.addHeader(new Header('foo', 'bar'));
      expect(lambdaResponse.headers.toObject()).toEqual({ foo: 'bar' });

      lambdaResponse.addHeader(new Header('foo', 42));
      expect(lambdaResponse.headers.toObject()).toEqual({ foo: 42 });
    });

    test('throws error when header is not of type Header', () => {
      const action = () => lambdaResponse.addHeader({});
      const assertions = e => {
        expect(e instanceof TypeError).toBe(true);
        expect(e.message).toBe('header must be of type Header');
      };
      expectError(action, assertions);
    });
  });

  describe('build method', () => {
    describe('when no changes have been made', () => {
      const actual = new LambdaResponse().build();

      test('statusCode', () => {
        expect(actual.statusCode).toBe(defaultStatusCode);
      });

      test('isBase64Encoded', () => {
        expect(actual.isBase64Encoded).toBe(defaultIsBase64Encoded);
      });

      test('headers', () => {
        expect(actual.headers).toEqual(defaultHeaders.toObject());
      });

      test('body', () => {
        expect(actual.body).toEqual(defaultBody);
      });
    });

    describe('when changes have been made', () => {
      let lambdaResponse;

      beforeEach(() => {
        lambdaResponse = new LambdaResponse();
      });

      test('statusCode', () => {
        const statusCode = 404;
        lambdaResponse.statusCode = statusCode;
        const actual = lambdaResponse.build();
        expect(actual.statusCode).toBe(statusCode);
      });

      test('isBase64Encoded', () => {
        const isBase64Encoded = true;
        lambdaResponse.isBase64Encoded = isBase64Encoded;
        const actual = lambdaResponse.build();
        expect(actual.isBase64Encoded).toBe(isBase64Encoded);
      });

      test('headers', () => {
        lambdaResponse.addHeader(new Header('foo', 'bar'));
        const actual = lambdaResponse.build();
        expect(actual.headers).toEqual({ foo: 'bar' });
      });

      test('body when isBase64Encoded is false', () => {
        const body = { foo: 'bar' };
        lambdaResponse.body = body;
        lambdaResponse.isBase64Encoded = false;
        const actual = lambdaResponse.build();
        expect(actual.body).toBe(JSON.stringify(body));
      });

      test('body when isBase64Encoded is true', () => {
        const body = "some-base-64-encoded-string";
        lambdaResponse.body = body;
        lambdaResponse.isBase64Encoded = true;
        const actual = lambdaResponse.build();
        expect(actual.body).toBe(body);
      });
    });
  });
});
