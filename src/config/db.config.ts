export const configuration = () => ({
  port: parseInt(process.env.PORT) || 8000,
  mongoUri: process.env.MONGO_URI,
});
