"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logLevel = _interopRequireDefault(require("../log-level"));

var _lambdaEnvironment = _interopRequireDefault(require("../lambda-environment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class LambdaLogger {
  constructor(name) {
    _defineProperty(this, "_log", (logType, data) => {
      if (_logLevel.default[logType] < _logLevel.default[_lambdaEnvironment.default.LOG_LEVEL]) {
        return;
      }

      const {
        message,
        error,
        categorizedData
      } = this._categorize(data);

      const {
        lambdaContext,
        lambdaEvent
      } = _lambdaEnvironment.default;
      console[logType](JSON.stringify({
        time: new Date().toISOString(),
        level: logType,
        logger: this.name,
        message: message.trim(),
        userId: lambdaEvent && lambdaEvent.userId,
        executionName: lambdaEvent && lambdaEvent.executionName,
        awsRequestId: lambdaContext && lambdaContext.awsRequestId,
        functionName: lambdaContext && lambdaContext.functionName,
        remainingTime: lambdaContext && lambdaContext.getRemainingTimeInMillis && lambdaContext.getRemainingTimeInMillis(),
        exception: error && error.stack,
        data: categorizedData
      }, (k, v) => !v ? undefined : v));
    });

    _defineProperty(this, "_categorize", data => {
      let message = '',
          error,
          categorizedData = [];
      data.forEach(d => {
        switch (typeof d) {
          case 'number':
          case 'string':
          case 'boolean':
            message += `${d} `;
            break;

          default:
            if (d instanceof Error) {
              error = d;
            } else {
              categorizedData.push(d);
            }

        }
      });

      if (categorizedData.length === 0) {
        categorizedData = undefined;
      } else if (categorizedData.length === 1) {
        categorizedData = categorizedData[0];
      }

      return {
        message,
        error,
        categorizedData
      };
    });

    this.name = name;
  }

  trace(...data) {
    this._log('trace', data);
  }

  debug(...data) {
    this._log('debug', data);
  }

  info(...data) {
    this._log('info', data);
  }

  warn(...data) {
    this._log('warn', data);
  }

  error(...data) {
    this._log('error', data);
  }

}

exports.default = LambdaLogger;
//# sourceMappingURL=index.js.map