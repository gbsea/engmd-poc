export default () => ({
  app: {
    name: process.env.APP_ID,
    env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "3000", 10),
    logLevel: process.env.LOG_LEVEL || "debug",
  },
});
