const express = require("express");

const cors = require("cors");
require('dotenv').config({path : './.env.local'});
const app = express();
app.use(cors());
app.use(express.json());


const sql = require('./DB/connection');
const roadmap = require('./Route/Roadmap');
const router = require('./Route/Registration');
const notification = require('./Route/Notifications')
const application = require('./Route/Application');
const applicants = require('./Route/Applicants');
const pro = require('./Route/profile');

const skill = require('./Route/Skill_gap');
const table = require('./Route/Skill_table');




app.use(router);
app.use(notification);
app.use(roadmap);
app.use(application);
app.use(applicants);
app.use(pro);


app.use(skill);
app.use(table);



app.get('/', async (req, res) => {
    console.log('Hello World');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});