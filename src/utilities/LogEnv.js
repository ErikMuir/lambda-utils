let lambdaEvent;
let lambdaContext;
let lambdaVersion;

module.exports = {
  get logLevel() { return process.env.LOG_LEVEL || 'info'; },

  get lambdaEvent() { return lambdaEvent; },
  get lambdaContext() { return lambdaContext; },
  get lambdaVersion() { return lambdaVersion; },

  initializeLambdaEnvironment: ({ event, context, version }) => {
    lambdaEvent = event;
    lambdaContext = context;
    lambdaVersion = version;
  },

  getEnvOrThrow: (envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Environment variable: ${envVar} not set.`);
    }
    return process.env[envVar];
  },
};
