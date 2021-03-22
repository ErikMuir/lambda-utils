"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
let lambdaEvent;
let lambdaContext;
let lambdaVersion;
const LogEnv = {
  get logLevel() {
    return process.env.LOG_LEVEL || 'info';
  },

  get lambdaEvent() {
    return lambdaEvent;
  },

  get lambdaContext() {
    return lambdaContext;
  },

  get lambdaVersion() {
    return lambdaVersion;
  },

  initializeLambdaEnvironment: ({
    event,
    context,
    version
  }) => {
    lambdaEvent = event;
    lambdaContext = context;
    lambdaVersion = version;
  },
  getEnvOrThrow: envVar => {
    if (!process.env[envVar]) {
      throw new Error(`Environment variable: ${envVar} not set.`);
    }

    return process.env[envVar];
  }
};
var _default = LogEnv;
exports.default = _default;
//# sourceMappingURL=LogEnv.js.map