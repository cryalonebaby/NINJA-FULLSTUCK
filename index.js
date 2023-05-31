const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config();

const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

async function start() {
  try {
    app.listen(PORT, () => console.log(`App started on port ${PORT}`))
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1)
  }
}

start()