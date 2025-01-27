const express = require('express');
const app = express();

require('dotenv').config({path: './.env.local'});
const port = process.env.PORT;


const sql = require('./Connection/DB');

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log('server running at port ' + port);
});