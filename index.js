const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const logger = require('./config/logger.config')
const heroesRoutes = require('./routes/heroes.routes');
require('dotenv').config();

const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/heroes', heroesRoutes);

async function start() {
  try {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => logger.info(`App started on port ${PORT}`))
  } catch (e) {
    logger.error('Server Error', e.message);
    process.exit(1)
  }
}

start()