const express = require("express");
const cors = require("cors");
require('dotenv').config({path : './.env.local'});
const sql = require('./DB/connection');
const router = require('./Route/Registration');
const notification = require('./Route/Notifications')

const app = express();
app.use(cors());
app.use(express.json());


const sql = require('./DB/connection');
const router = require('./Route/Registration');
const roadmap = require('./Route/Roadmap');
const cloudinary = require('./Route/Cloud');


app.use(router);
app.use(notification);
app.use(roadmap);
app.use(cloudinary);



app.get('/', async (req, res) => {
    console.log('Hello World');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});