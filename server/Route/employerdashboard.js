const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

router.get("/getnotificationsforemployee/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;
  
    const response =
      await sql`SELECT details from notification where receiver_id = ${useruuid}`;
    res.json(response);
  } catch (err) {
  }
});
router.get("/getuserdata/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;
  
    const response =
      await sql`SELECT name, profile_pic from user_info where user_id = ${useruuid}`;
    res.json(response);
  } catch (err) {
  }
});
router.get("/getapplicants/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;
  
    const response =
      await sql`SELECT COUNT(application_id) from application a, job_post j 
          WHERE 
          j.employer_id = ${useruuid} AND
          j.post_id = a.job_post_id`;
    res.json(response);
  } catch (err) {
  }
});
router.get("/getrecruited/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;
  
    const response =
      await sql`SELECT COUNT(application_id) from application a, job_post j 
            WHERE 
            j.employer_id = ${useruuid} AND
            j.post_id = a.job_post_id AND 
            status = 'Accepted'`;
    res.json(response);
  } catch (err) {
  }
});
router.get("/get-all-jobs/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;
    const response =
      await sql`SELECT e.company_logo, j.company_name, j.role, j.salary, j.location, j.description, e.company_logo from job_post j, employer e
         WHERE
        e.employer_id = ${useruuid} AND 
        e.employer_id = j.employer_id;`;
    res.json(response);
  } catch (err) {
  }
});
router.get("/getjobcount/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;

    const response = await sql`
      SELECT 
        EXTRACT(MONTH FROM post_date) AS month,
        EXTRACT(YEAR FROM post_date) AS year,
        COUNT(*) AS total_jobs
      FROM job_post
      WHERE employer_id = ${useruuid}
      GROUP BY year, month
      ORDER BY year, month;
    `;

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Database query failed" });
  }
});
router.get("/getapplicantcount/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;

    const response = await sql`
      SELECT 
        EXTRACT(MONTH FROM application_date) AS month,
        EXTRACT(YEAR FROM application_date) AS year,
        COUNT(*) AS total_applicants
      FROM job_post j, application a
      WHERE 
       j.employer_id = ${useruuid} AND
       j.post_id = a.job_post_id
      GROUP BY year, month
      ORDER BY year, month;
    `;

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Database query failed" });
  }
});
router.get("/getrecruitcount/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;

    const response = await sql`
      SELECT 
        EXTRACT(MONTH FROM application_date) AS month,
        EXTRACT(YEAR FROM application_date) AS year,
        COUNT(*) AS total_recruits
      FROM job_post j, application a
      WHERE 
       j.employer_id = ${useruuid} AND
            j.post_id = a.job_post_id AND 
            status = 'Accepted'
      GROUP BY year, month
      ORDER BY year, month;
    `;

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Database query failed" });
  }
});
module.exports = router;
