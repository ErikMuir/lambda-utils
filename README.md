# lambda-utils
AWS Lambda utilities for NodeJS

## Installation
```
$ npm isntall @erikmuir/lambda-utils
```

## Usage

### Utilities

#### LambdaEnvironment
coming soon... (TODO: maybe rename this LambdaLoggerEnvironment since it's only real purpose is to serve the LambdaLogger)

#### LambdaLogger
Provides structured logging for your AWS Lambda functions, which allows you to more easily query your logs in tools like CloudWatch Log Insights, or even third-party tools like Splunk. This enables you to create insightful dashboards that give visibility into your distributed, serverless applications.
```
const { LambdaLogger } = require('@erikmuir/lambda-utils');

exports.handler = function(event, context) {
  const logger = new LambdaLogger('index.handler');
  logger.info('Hello world!');
}
```
This would produce the following structured log:
```
{
  "time": "2020-08-09T22:37:24Z",
  "level": "info",
  "logger": "index.handler",
  "message": "Hello world!"
}
```

#### LambdaResponse
coming soon...
