const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

router.post("/jobpost", async (req, res) => {
  const {
    useruuid,
    jobRole,
    salary,
    jobType,
    workingHours,
    jobDescription,
    location,
    requiredskills,
  } = req.body;
 // console.log(req.body);
  const postid = uuidv4();
  const companyname = "Google";
  console.log({
    postid,
    useruuid,
    jobRole,
    salary,
    jobDescription,
    location,
    requiredskills,
    jobType,
    workingHours,
    companyname,
  });
  result =
    await sql` INSERT INTO job_post (post_id, employer_id, role, salary, description, location, post_date, job_type, working_hours, company_name, required_skill) VALUES (${postid}, ${useruuid}, 
${jobRole}, ${salary}, ${jobDescription}, ${location},  NOW(), ${jobType}, ${workingHours}, ${companyname}, ${requiredskills})`;
  if (!result) {
    console.log("Error inserting in the table");
  } else {
    console.log("Successful");
  }
});
router.get("/skills", async (req, res) => {
  try {
    const response = await sql`SELECT skill_id, name FROM required_skill`;

    console.log(response);
    res.json(response);
  } catch (error) {
    console.error("Error fetching skills", error);
  }
});
router.get("/getjobposts", async (req, res) => {
  try {
    const { uuid } = req.query;
    //console.log(uuid);
    const response =
      await sql`SELECT post_id, company_name, role, salary, post_date, description from job_post where employer_id = ${uuid}`;
    console.log("Jobposts: ", response);
    res.json(response);
  } catch (err) {
    console.error("Error fetching the jobs", err);
  }
});
router.delete("/deletejobpost/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params;
    //console.log(post_id);
    const response = await sql`DELETE from job_post where post_id = ${post_id}`;
    res.status(200).json({ message: "Job post deleted successfully" });
  } catch (err) {
    console.error("Failed deleting job post", err);
  }
});
router.put("/updatejobpost/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params;
    console.log(post_id);
    const { role, salary, description } = req.body;
    const response = await sql`UPDATE job_post
    SET role = ${role}, salary = ${salary}, description = ${description} where post_id = ${post_id}`;
    res.status(200).json({ message: "Job post updated successfully" });
  } catch (err) {
    console.error("Failed updating job post", err);
  }
});
module.exports = router;
