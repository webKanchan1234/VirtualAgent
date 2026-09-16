const PORT = process.env.PORT || 3000;

const SESSION_SERVICE_URL =
  process.env.SESSION_SERVICE_URL ||
  "http://localhost:3001";

const CORE_CHOREOGRAPHER_URL =
  process.env.CORE_CHOREOGRAPHER_URL ||
  "http://localhost:3002";

module.exports = {
  port: PORT,
  sessionServiceUrl: SESSION_SERVICE_URL,
  coreChoreographerUrl:CORE_CHOREOGRAPHER_URL
};