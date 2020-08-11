"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const LambdaLoggerEnvironment = {
  lambdaContext: null,
  lambdaEvent: null,

  get LOG_LEVEL() {
    return getEnvOrDefault('LOG_LEVEL', 'info');
  }

};

const getEnvOrDefault = (key, defaultVal) => process.env[key] === undefined ? defaultVal : process.env[key];

const getEnvOrThrow = key => {
  if (process.env[key] === undefined) {
    throw new Error(`Environment variable: ${key} not set.`);
  }

  return process.env[key];
};

var _default = LambdaLoggerEnvironment;
exports.default = _default;
//# sourceMappingURL=index.js.map