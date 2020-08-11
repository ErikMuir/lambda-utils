import LogEnv from '../src/utilities/log-env';

describe('LogEnv', () => {
  describe('LOG_LEVEL', () => {
    test('returns LOG_LEVEL environment variable value when set', () => {
      const expected = 'trace';
      process.env = Object.assign(process.env, { LOG_LEVEL: expected });
      const actual = LogEnv.logLevel;
      expect(actual).toBe(expected);
      delete process.env.LOG_LEVEL;
    });

    test('defaults to info', () => {
      const expected = 'info';
      const actual = LogEnv.logLevel;
      expect(actual).toBe(expected);
    });
  });
});
