import LambdaResponse from '../src/utilities/lambda-response';
import Header from '../src/utilities/header';

describe('LambdaResponse', () => {
  const defaultStatusCode = 200;
  const defaultHeaders = {};
  const defaultBody = {};

  describe('constructor', () => {
    const actual = new LambdaResponse();

    test('sets default statusCode', () => {
      expect(actual.statusCode).toBe(defaultStatusCode);
    });

    test('sets default headers', () => {
      expect(actual.headers).toEqual(defaultHeaders);
    });

    test('sets default body', () => {
      expect(actual.body).toEqual(defaultBody);
    });
  });

  describe('addHeader method', () => {
    const lambdaResponse = new LambdaResponse();

    test('appends to headers', () => {
      lambdaResponse.addHeader(new Header('foo', 'bar'));
      expect(lambdaResponse.headers).toEqual({ foo: 'bar' });

      lambdaResponse.addHeader(new Header('baz', 42));
      expect(lambdaResponse.headers).toEqual({ foo: 'bar', baz: 42 });
    });

    test('throws error when header is not of type Header', () => {
      try {
        lambdaResponse.addHeader({});
      } catch (e) {
        expect(e instanceof TypeError).toBe(true);
        expect(e.message).toBe('header must be of type Header');
      }
    });
  });

  describe('build method', () => {
    describe('when no changes have been made', () => {
      const actual = new LambdaResponse().build();

      test('returns object with default statusCode', () => {
        expect(actual.statusCode).toBe(defaultStatusCode);
      });

      test('returns object with default headers', () => {
        expect(actual.headers).toEqual(defaultHeaders);
      });

      test('returns object with default body', () => {
        expect(actual.body).toEqual(JSON.stringify(defaultBody));
      });
    });

    describe('when changes have been made', () => {
      const lambdaResponse = new LambdaResponse();

      test('returns object with expected statusCode', () => {
        const statusCode = 404;
        lambdaResponse.statusCode = statusCode;
        const actual = lambdaResponse.build();
        expect(actual.statusCode).toBe(statusCode);
      });

      test('returns object with expected headers', () => {
        lambdaResponse.addHeader(new Header('foo', 'bar'));
        const actual = lambdaResponse.build();
        expect(actual.headers).toEqual({ foo: 'bar' });
      });

      test('returns object with expected body', () => {
        const body = { foo: 'bar' };
        lambdaResponse.body = body;
        const actual = lambdaResponse.build();
        expect(actual.body).toBe(JSON.stringify(body));
      });
    });
  });
});
