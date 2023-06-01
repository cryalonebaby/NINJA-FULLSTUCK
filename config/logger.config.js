const { createLogger, transports, format } = require('winston')
const { combine, timestamp, json, prettyPrint } = format;
require('dotenv').config();


const logger = createLogger({
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.Console({
      level: 'info'
    }),
    new transports.File({
      level: 'error',
      filename: 'logs/error.log', // save to gitignored file logs/error.log
      format: json()
    })
  ]
})

module.exports = logger