import LogLevel from './LogLevel';
import LogEnv from './LogEnv';

export default class LambdaLogger {
  constructor(name) {
    this.name = name;
  }

  trace(...data) { this._log('trace', data); }
  debug(...data) { this._log('debug', data); }
  info(...data) { this._log('info', data); }
  warn(...data) { this._log('warn', data); }
  error(...data) { this._log('error', data); }

  _log = (logType, data) => {
    if (LogLevel[logType] < LogLevel[LogEnv.logLevel]) {
      return;
    }
    
    const { message, error, categorizedData } = this._categorize(data);
    const { lambdaContext, lambdaEvent } = LogEnv;

    console[logType](
      JSON.stringify(
        {
          time: new Date().toISOString(),
          level: logType,
          logger: this.name,
          message: message.trim(),
          userId: lambdaEvent && lambdaEvent.userId,
          executionName: lambdaEvent && lambdaEvent.executionName,
          awsRequestId: lambdaContext && lambdaContext.awsRequestId,
          functionName: lambdaContext && lambdaContext.functionName,
          remainingTime:
            lambdaContext && lambdaContext.getRemainingTimeInMillis && lambdaContext.getRemainingTimeInMillis(),
          exception: error && error.stack,
          data: categorizedData,
        },
        (k, v) => (!v ? undefined : v)
      )
    );
  };

  _categorize = data => {
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

    return { message, error, categorizedData };
  };
}
