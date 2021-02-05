const cron = require('node-cron');
const express = require('express');
const mong = require('./dbnul');

app = express();

cron.schedule(' */10 * * * * *', function() {
    console.log('running a task every 10 second');
    console.log(mong.fetch("Sioux", "auto_mode"))
  });
  console.log('ah')

app.listen(3000);