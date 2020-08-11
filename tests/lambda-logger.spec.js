import LambdaLogger from '../src/utilities/lambda-logger';
import LogLevel from '../src/utilities/log-level';
import LogEnv from '../src/utilities/log-env';

describe('LambdaLogger', () => {
  let trace, debug, info, warn, error, logs = [];
  const logger = new LambdaLogger();
  const pushLog = log => logs.push(JSON.parse(log));
  const setLogLevel = logLevel => (process.env.LOG_LEVEL = logLevel);

  beforeAll(() => {
    LogEnv.lambdaEvent = {};
    LogEnv.lambdaContext = {};
    trace = jest.spyOn(console, 'trace').mockImplementation(pushLog);
    debug = jest.spyOn(console, 'debug').mockImplementation(pushLog);
    info = jest.spyOn(console, 'info').mockImplementation(pushLog);
    warn = jest.spyOn(console, 'warn').mockImplementation(pushLog);
    error = jest.spyOn(console, 'error').mockImplementation(pushLog);
  });

  afterEach(() => {
    logs = [];
    jest.clearAllMocks();
    setLogLevel();
    LogEnv.lambdaEvent = {};
    LogEnv.lambdaContext = {};
  });

  afterAll(() => {
    jest.restoreAllMocks();
    setLogLevel();
  });

  describe('constructor', () => {
    test('sets name', () => {
      const expected = 'foobar';
      const fooLogger = new LambdaLogger(expected);
      expect(fooLogger.name).toBe(expected);
    });
  });

  describe('respects log level', () => {
    ['trace', 'debug', 'info', 'warn', 'error'].forEach(logLevel => {
      test(logLevel, () => {
        setLogLevel(logLevel);

        logger.trace('foo');
        logger.debug('foo');
        logger.info('foo');
        logger.warn('foo');
        logger.error('foo');

        expect(trace).toHaveBeenCalledTimes(LogLevel['trace'] < LogLevel[logLevel] ? 0 : 1);
        expect(debug).toHaveBeenCalledTimes(LogLevel['debug'] < LogLevel[logLevel] ? 0 : 1);
        expect(info).toHaveBeenCalledTimes(LogLevel['info'] < LogLevel[logLevel] ? 0 : 1);
        expect(warn).toHaveBeenCalledTimes(LogLevel['warn'] < LogLevel[logLevel] ? 0 : 1);
        expect(error).toHaveBeenCalledTimes(LogLevel['error'] < LogLevel[logLevel] ? 0 : 1);
      });
    });
  });

  describe('log properties', () => {
    test('time', () => {
      logger.info();
      const log = logs[0];
      expect(log.time).toBeDefined();
    });

    test('level', () => {
      logger.info();
      const log = logs[0];
      expect(log.level).toBe('info');
    });

    test('logger', () => {
      const fooLogger = new LambdaLogger('foobar');
      fooLogger.info();
      const log = logs[0];
      expect(log.logger).toBe('foobar');
    });

    test('message when string', () => {
      const message = 'foobar';
      logger.info(message);
      const log = logs[0];
      expect(log.message).toBe(message);
    });

    test('message when number', () => {
      const message = 42;
      logger.info(message);
      const log = logs[0];
      expect(log.message).toBe(`${message}`);
    });

    test('message when boolean', () => {
      const message = true;
      logger.info(message);
      const log = logs[0];
      expect(log.message).toBe(`${message}`);
    });

    test('message when multiple args', () => {
      logger.info('foo', 'bar', 42, true);
      const log = logs[0];
      expect(log.message).toBe('foo bar 42 true');
    });

    test('message when array', () => {
      logger.info(['foo', 'bar', 42, true]);
      const log = logs[0];
      expect(log.message).not.toBeDefined();
    });

    test('message when object', () => {
      logger.info({ foo: 'bar' });
      const log = logs[0];
      expect(log.message).not.toBeDefined();
    });

    test('userId', () => {
      LogEnv.lambdaEvent.userId = 'foobar';
      logger.info();
      const log = logs[0];
      expect(log.userId).toBe('foobar');
    });

    test('executionName', () => {
      LogEnv.lambdaEvent.executionName = 'foobar';
      logger.info();
      const log = logs[0];
      expect(log.executionName).toBe('foobar');
    });

    test('awsRequestId', () => {
      LogEnv.lambdaContext.awsRequestId = 'foobar';
      logger.info();
      const log = logs[0];
      expect(log.awsRequestId).toBe('foobar');
    });

    test('functionName', () => {
      LogEnv.lambdaContext.functionName = 'foobar';
      logger.info();
      const log = logs[0];
      expect(log.functionName).toBe('foobar');
    });

    test('remainingTime', () => {
      LogEnv.lambdaContext.getRemainingTimeInMillis = () => 5000;
      logger.info();
      const log = logs[0];
      expect(log.remainingTime).toBe(5000);
    });

    test('exception', () => {
      const error = new Error('foobar');
      logger.info(error);
      const log = logs[0];
      expect(log.exception).toBe(error.stack);
    });

    test('data when object', () => {
      const expected = { foo: 'bar' };
      logger.info(expected);
      const log = logs[0];
      expect(log.data).toEqual(expected);
    });

    test('data when array', () => {
      const expected = ['foo', 'bar', 42, true];
      logger.info(expected);
      const log = logs[0];
      expect(log.data).toEqual(expected);
    });

    test('data when not object or array', () => {
      logger.info('foobar');
      const log = logs[0];
      expect(log.data).not.toBeDefined();
    });
  });
});
