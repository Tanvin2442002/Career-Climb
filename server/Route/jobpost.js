const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

router.post("/jobpost", async (req, res) => {
  const {
    jobRole,
    salary,
    jobType,
    workingHours,
    jobDescription,
    location,
    minqualification,
    preferredqualification,
  } = req.body;
  //console.log(req.body);
  const postid = uuidv4();
  const empid = "12fbff6b-25e3-44dc-9b66-1fba68bd51b0";
  const companyname = "Google";
  console.log({
    postid,
    empid,
    jobRole,
    salary,
    jobDescription,
    location,
    preferredqualification,
    minqualification,
    jobType,
    workingHours,
    companyname,
  });
  result =
    await sql` INSERT INTO job_post (post_id, employer_id, role, salary, description, location, pref_qualification, min_qualification, post_date, job_type, working_hours, company_name) VALUES (${postid}, ${empid}, 
${jobRole}, ${salary}, ${jobDescription}, ${location}, ${preferredqualification}, ${minqualification}, NOW(), ${jobType}, ${workingHours}, ${companyname})`;
  if (!result) {
    console.log("Error inserting in the table");
  } else {
    console.log("Successful");
  }
});
module.exports = router;
