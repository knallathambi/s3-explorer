const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const WEB_PORT = process.env.WEB_PORT || 9080;
const app = express();
const S3Router = require('./routers/S3Router');

app.use(morgan(process.env.NODE_ENV || 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api', (req, res) => res.json({status: 'UP'}));
app.use('/api/s3', S3Router);


app.listen(WEB_PORT, () => {
    console.log(`Server listening to port - ${WEB_PORT}`);
});