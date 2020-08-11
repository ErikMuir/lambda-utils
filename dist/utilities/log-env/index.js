"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const LogEnv = {
  lambdaContext: null,
  lambdaEvent: null,

  get logLevel() {
    return process.env.LOG_LEVEL || 'info';
  }

};
var _default = LogEnv;
exports.default = _default;
//# sourceMappingURL=index.js.map