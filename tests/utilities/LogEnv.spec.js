const LogEnv = require('../../src/utilities/LogEnv');

describe('LogEnv', () => {
  let originalEnv;

  beforeAll(() => {
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe('logLevel', () => {
    test('returns LOG_LEVEL environment variable value when set', () => {
      const expected = 'trace';
      process.env = { ...process.env, LOG_LEVEL: expected };

      expect(LogEnv.logLevel).toBe(expected);
    });

    test('defaults to info', () => {
      const expected = 'info';

      expect(LogEnv.logLevel).toBe(expected);
    });
  });

  describe('initializeLambdaEnvironment', () => {
    beforeEach(() => {
      expect(LogEnv.lambdaEvent).not.toBeDefined();
      expect(LogEnv.lambdaContext).not.toBeDefined();
      expect(LogEnv.lambdaVersion).not.toBeDefined();
    });

    test('sets lambdaEvent, lambdaContext, and lambdaVersion', () => {
      const event = { foo: 'event' };
      const context = { bar: 'context' };
      const version = 'v1.0.0';

      LogEnv.initializeLambdaEnvironment({ event, context, version });

      expect(LogEnv.lambdaEvent).toBe(event);
      expect(LogEnv.lambdaContext).toBe(context);
      expect(LogEnv.lambdaVersion).toBe(version);
    });
  });

  describe('getEnvOrThrow', () => {
    const envVar = 'FOO_BAR';

    test('returns environment variable value when set', () => {
      const expected = 'baz';
      process.env[envVar] = expected;

      expect(LogEnv.getEnvOrThrow(envVar)).toBe(expected);
    });

    test('throws when environment variable is not set', () => {
      expect(() => LogEnv.getEnvOrThrow(envVar)).toThrow(`Environment variable: ${envVar} not set.`);
    });
  });
});
