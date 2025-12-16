const PORT = process.env.PORT || 3000;
const dbURL = process.env.dbURL;
const jwtSecret = process.env.jwtSecret;

module.exports = {
  PORT,
  dbURL,
  jwtSecret,
};
