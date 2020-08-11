"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  lambdaContext: null,
  lambdaEvent: null,

  get LOG_LEVEL() {
    return getEnvOrDefault('LOG_LEVEL', 'info');
  }

};
exports.default = _default;

const getEnvOrDefault = (key, defaultVal) => process.env[key] === undefined ? defaultVal : process.env[key];

const getEnvOrThrow = key => {
  if (process.env[key] === undefined) {
    throw new Error(`Environment variable: ${key} not set.`);
  }

  return process.env[key];
};
//# sourceMappingURL=index.js.map