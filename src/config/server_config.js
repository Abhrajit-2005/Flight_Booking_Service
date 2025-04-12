const dotenv = require('dotenv');
const { USE } = require('sequelize/lib/index-hints');
dotenv.config();
module.exports = {
    PORT: process.env.PORT,
    FLIGHT_SERVICE_PATH: process.env.FLIGHT_SERVICE_PATH,
    USER_SERVICE_PATH: process.env.USER_SERVICE_PATH,
    REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL
}