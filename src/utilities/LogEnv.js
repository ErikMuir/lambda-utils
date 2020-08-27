const LogEnv = {
  lambdaContext: null,
  lambdaEvent: null,
  get logLevel() {
    return process.env.LOG_LEVEL || 'info';
  }
};

export default LogEnv;
