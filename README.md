# lambda-utils
AWS Lambda utilities for NodeJS

## Installation
```
$ npm install @erikmuir/lambda-utils --save
```

## Usage

### Utilities

#### LambdaLogger
Provides structured logging for your AWS Lambda functions, which allows you to more easily query your logs in tools like CloudWatch Log Insights, or even third-party tools like Splunk. This enables you to create insightful dashboards that give visibility into your distributed, serverless applications.
``` javascript
const { LambdaLogger } = require('@erikmuir/lambda-utils');

function myFunction(arg1, arg2) {
  const logger = new LambdaLogger('myFunction');
  logger.info("Hello world!", { arg1, arg2 });
}
```
If this function was invoked like `myFunction(42, true)`, it would produce the following structured log:
``` javascript
{
  "time": "2020-08-09T22:37:24Z",
  "level": "info",
  "logger": "myFunction",
  "message": "Hello world!",
  "data": {
    "arg1": 42,
    "arg2": true
  },
  // the following fields come from the event and context properties
  // IF they were set on the LogEnv object
  "userId": "user-id",
  "executionName": "execution-name",
  "awsRequestId": "aws-request-id",
  "functionName": "aws-lambda-function-name",
  "remainingTime": 2974
}
```
The LambdaLogger also respects the current log level. So if the current log level is "info", then a call to `logger.trace()` or `logger.debug()` would not actually log anything.

#### LogLevel
This is an enumeration consisting of all the available log levels: `trace`, `debug`, `info`, `warn`, and `error`.

#### LogEnv
This is a singleton that is used by the LambdaLogger. The first thing you should do in your function's handler is to set the event and context properties so that the structured logs can have access to the info contained in them.
``` javascript
const { LogEnv } = require('@erikmuir/lambda-utils');

exports.handler = async function (event, context) {
  LogEnv.lambdaEvent = event;
  LogEnv.lambdaContext = context;
  // the rest of your code goes here
}
```
The LambdaLogger also uses the LogEnv singleton to get the current log level, however it cannot be set directly. It tries to get the value of an environment variable called "LOG_LEVEL". If it doesn't exist, it will default to `info`.

#### LambdaResponse
coming soon...
