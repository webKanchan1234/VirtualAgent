const PORT = process.env.PORT || 3000;

const SESSION_SERVICE_URL =
  process.env.SESSION_SERVICE_URL ||
  "http://localhost:3001";

module.exports = {
  port: PORT,
  sessionServiceUrl: SESSION_SERVICE_URL
};