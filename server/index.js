const express = require("express");

const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const app = express();
app.use(cors());
app.use(express.json());

const sql = require("./DB/connection");
const roadmap = require("./Route/Roadmap");
const router = require("./Route/Registration");
const notification = require("./Route/Notifications");
const application = require("./Route/Application");
const applicants = require("./Route/Applicants");
const jobpost = require("./Route/jobpost");
const profile = require("./Route/profile");
const skill = require("./Route/Skill_gap");
const table = require("./Route/Skill_table");
const employeedashboard = require("./Route/employeedashboard");
const employerdashboard = require("./Route/employerdashboard");

app.use(router);
app.use(notification);
app.use(roadmap);
app.use(application);
app.use(applicants);
app.use(jobpost);
app.use(profile);
app.use(skill);
app.use(table);
app.use(employeedashboard);
app.use(employerdashboard);

app.get("/", async (req, res) => {
  console.log("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
