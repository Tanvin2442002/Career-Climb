const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();

router.get("/api/employer", async (req, res) => {
    const  uuid  = req.query.id;

  const data = await sql`SELECT * FROM employer, user_info 
                          WHERE employer_id = user_id
                          and employer_id = ${uuid}`;

    console.log(uuid);
    if (data.length === 0) {
        res.status(220).send({ message: "data not found" });
    } else {
        res.json(data);
    }

    
});


router.post("/api/employer2", async (req, res) => { 
    try {
      //const id = req.query.id;
      //if (!id) return res.status(400).json({ error: "Missing employer ID" });
  
      const { name, phone, bio, id } = req.body;
        console.log(req.body);
      console.log("Employer ID:", id);
      console.log("Updating employer with data:", { name, phone, bio });
  
      const data = await sql`UPDATE user_info SET 
                     name = ${name}, 
                     phone_no = ${phone}, 
                     bio = ${bio} 
                     WHERE user_id = ${id}`;
  
      if (data.count === 0) {
        return res.status(404).json({ message: "Employer not found or no update made." });
      }
  
      res.status(200).json({ message: "Profile updated successfully!" });
  
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/api/update-employer", async (req, res) => {
    const { id, company, company_location, founded, company_detail, why_work, logo } = req.body;
    console.log("Updating employer with data:", { id, company, company_location, founded, company_detail, why_work, logo });
   console.log(req.body);
    try {
      // Update employer details
      const data = await sql`
        UPDATE employer SET 
          company_name = ${company}, 
          company_location = ${company_location}, 
          founded = ${founded}, 
          company_details = ${company_detail}, 
          why_work = ${why_work},
          company_logo=${logo} 
        WHERE employer_id = ${id}`;
  
      res.status(200).send({ message: "Company profile updated successfully!" });
    } catch (error) {
      console.error("Database update error:", error);
      res.status(500).send({ error: "Failed to update company profile." });
    }
  });



  router.get("/api/employee", async (req, res) => {
    const  uuid  = req.query.id;

  const data = await sql`SELECT * FROM employee, user_info 
                          WHERE employee_id = user_id
                          and employee_id = ${uuid}`;

    console.log(uuid);
    if (data.length === 0) {
        res.status(220).send({ message: "data not found" });
    } else {
        res.json(data);
    }

    
});


router.post("/api/employee-update", async (req, res) => { 
  try {
    //const id = req.query.id;
    //if (!id) return res.status(400).json({ error: "Missing employer ID" });

    const { name, phone, bio, id } = req.body;
      console.log(req.body);
    console.log("Employee ID:", id);
    console.log("Updating employee with data:", { name, phone, bio });

    const data = await sql`UPDATE user_info SET 
                   name = ${name}, 
                   phone_no = ${phone}, 
                   bio = ${bio} 
                   WHERE user_id = ${id}`;

    if (data.count === 0) {
      return res.status(404).json({ message: "Employee not found or no update made." });
    }

    res.status(200).json({ message: "Profile updated successfully!" });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
  
router.put("/api/update-skills", async (req, res) => {
  const { userId, skills } = req.body;

  if (!userId || !Array.isArray(skills)) {
      return res.status(400).json({ error: "Invalid request data" });
  }

  try {
      // Convert JavaScript array to PostgreSQL format
      const skillsArray = sql.array(skills); // FIX: Proper PostgreSQL array format

      const data = await sql`
          UPDATE employee 
          SET skills = ${skillsArray}
          WHERE employee_id = ${userId}
          RETURNING skills`;

      if (data.length === 0) {
          return res.status(404).json({ error: "Employer not found" });
      }

      res.status(200).json({ message: "Skills updated successfully!", skills: data[0].skills });

  } catch (error) {
      console.error("Error updating skills:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});





module.exports = router;