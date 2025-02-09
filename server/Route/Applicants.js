const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();



router.get("/applicants/:userID", async (req, res) => {

    const { userID } = req.params;
    try {
        const result = await sql`
            SELECT 
            user_employee.name AS employee_name,  
            user_employer.name AS employer_name, 
            user_employee.bio,  
            application.application_id,
            employee.employee_id,
            job_post.post_id,
            job_post.role,
            CASE 
                WHEN salary >= 1000000 THEN TO_CHAR(salary / 1000000, 'FM999') || 'M'
                WHEN salary >= 1000 THEN TO_CHAR(salary / 1000, 'FM999') || 'k'
                ELSE TO_CHAR(salary, 'FM999') 
            END AS salary,
            job_type,
            TO_CHAR(application_date, 'DD/MM/YYYY') AS application_date
            FROM employee
            JOIN user_info AS user_employee ON user_employee.user_id = employee.employee_id  
            JOIN application ON application.employee_id = employee.employee_id
            JOIN job_post ON job_post.post_id = application.job_post_id
            JOIN employer ON employer.employer_id = job_post.employer_id
            JOIN user_info AS user_employer ON user_employer.user_id = employer.employer_id  
            WHERE employer.employer_id = ${userID};`;              

            res.status(200).json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error fetching applications",
            error: err.message
        });
    }
});

router.get("/roles", async (req, res) => {
    try{
        const result = await sql `select name from role`;
        res.status(200).json(result);
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message: "Error fetching roles",
            error: err.message
        });
    }
});

module.exports = router;