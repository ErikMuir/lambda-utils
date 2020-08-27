# lambda-utils

AWS Lambda utilities for NodeJS

![npm (scoped)](https://img.shields.io/npm/v/@erikmuir/lambda-utils)
&nbsp;
![npm](https://img.shields.io/npm/dt/@erikmuir/lambda-utils)
&nbsp;
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@erikmuir/lambda-utils)
&nbsp;
![NPM](https://img.shields.io/npm/l/@erikmuir/lambda-utils)
&nbsp;
![GitHub last commit](https://img.shields.io/github/last-commit/erikmuir/lambda-utils)
&nbsp;
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@erikmuir/lambda-utils)
&nbsp;
![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/erikmuir/lambda-utils)

## Installation
```
$ npm install @erikmuir/lambda-utils --save
```

## Usage

### Utilities

- [LambdaLogger](#lambdalogger)
- [LogLevel](#loglevel)
- [LogEnv](#logenv)
- [Header](#header)
- [LambdaResponse](#lambdaresponse)

### LambdaLogger
LambdaLogger exposes five logging methods: `trace`, `debug`, `info`, `warn`, and `error`, all of which respect the current log level. So, for example, if the current log level is "info", then a call to `trace()` or `debug()` would not actually log anything.

The LambdaLogger also provides structured logging for your AWS Lambda functions, which allows you to more easily query your logs in tools like CloudWatch Log Insights, or even third-party tools like Splunk. This enables you to create insightful dashboards that give visibility into your distributed, serverless applications.

``` javascript
const { LambdaLogger } = require('@erikmuir/lambda-utils');

function myFunction(arg1, arg2) {
  const logger = new LambdaLogger('myFunction');
  logger.info("Hello world!", { arg1, arg2 });
}
```
If the above function were invoked like `myFunction(42, true)`, it would produce the following structured log:
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
  // ...and event/context properties, if they were set on LogEnv
}
```

### LogLevel
This is an enumeration consisting of all the available log levels. Their values are used when implementing a logging threshhold. Each log level has a corresponding method on the LambdaLogger class.

| Level | Value |
|-------|:-----:|
| trace | 10    |
| debug | 20    |
| info  | 30    |
| warn  | 40    |
| error | 50    |

### LogEnv
This is a singleton that is used by the LambdaLogger. The first thing you should do in your function's handler is to set the event and context properties so that the structured logs can have access to the info contained in them.
``` javascript
const { LogEnv } = require('@erikmuir/lambda-utils');

exports.handler = async function (event, context) {
  LogEnv.lambdaEvent = event;
  LogEnv.lambdaContext = context;
  // the rest of your code goes here
}
```
The LambdaLogger also uses the LogEnv singleton to get the current log level, however it cannot be set directly. It tries to get the value of an environment variable called `LOG_LEVEL`. If it doesn't exist, it will default to `info`.

### Header
The Header class is used to create key/value pairs to be used as headers in a LambdaResponse. The constructor requires both a key and a value. The key must be a string, and the value must be a string, number, or boolean. If either of the arguments are invalid it will throw a `TypeError`.
``` javascript
const { Header } = require('@erikmuir/lambda-utils');

const header = new Header('key', 'value');
```

### LambdaResponse
The LambdaResponse class has the following properties: `statusCode`, `isBase64Encoded`, `body`, and `headers`. The first three properties have normal getters and setters, but headers must be added one at a time via the `addHeader` method. _Note: Adding a header with the same key as an existing header will result in the original value being replaced with the new value._
``` javascript
const { LambdaResponse, Header } = require('@erikmuir/lambda-utils');

const response = new LambdaResponse();

response.statusCode = 200;
response.isBase64Encoded = false;
response.body = { message: 'Success!' };

var header1 = new Header('key1', 'value1');
var header2 = new Header('key2', 'value2');

response.addHeader(header1);
response.addHeader(header2);
```
When you're ready to return the response, you'll need to call the `.build()` method. This builds the response object that AWS Lambda expects to receive. _Note: If `isBase64Encoded` is false, the body will be JSON stringified._
``` javascript
return response.build();
```
This will return the following object:
``` json
{
  "statusCode": 200,
  "headers": {
    "key1": "value1",
    "key2": "value2"
  },
  "body": "{\"message\":\"Success!\"}"
}
```
