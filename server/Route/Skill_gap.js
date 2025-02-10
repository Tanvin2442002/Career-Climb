const express = require("express");
const sql = require("../DB/connection"); // Assuming SQL connection module
const router = express.Router();

// Fetch job roles based on selected sector
router.get("/api/job-roles", async (req, res) => {
  try {
    const { sector } = req.query; // sector is passed from frontend
    // Validate sector to avoid SQL injection or unexpected queries
    if (!sector || typeof sector !== "string") {
      return res.status(400).json({ message: "Invalid sector parameter" });
    }

    // Use parameterized query to prevent SQL injection
    const result = sector !== "Default"
  ? await sql`SELECT name, description,role_id as jobid FROM Role WHERE category = ${sector}`
  : await sql`SELECT name, description,role_id as jobid  FROM Role`; // Fetch all roles if no sector


   
    // Check if roles are found and return the response
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(404).json({ message: "No roles found for the selected sector" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching job roles", error: error.message });
  }
});

const fetchEmployeeId = async (req, res, next) => {
  try {
    const userEmail = req.headers["x-user-email"]; // Assuming user email is passed in headers

    if (!userEmail) {
      return res.status(401).json({ message: "User email is missing from headers" });
    }

    // Fetch employee_id using email
    const employee = await sql`SELECT employee_id FROM employee WHERE email = ${userEmail}`;
    if (employee.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Attach employee_id to the request object
    req.employeeId = employee[0].employee_id;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee ID", error: error.message });
  }
};

router.post("/api/toggle-bookmark", async (req, res) => {
  try {
    const { jobid, employeeId } = req.body;

    if (!jobid || !employeeId) {
      return res.status(400).json({ message: "Missing jobId or employeeId" });
    }

    // Check if the bookmark already exists
    const existingBookmark = await sql`
      SELECT * FROM saved_role WHERE role_id = ${jobid} AND employee_id = ${employeeId}`;

    if (existingBookmark.length > 0) {
      // If exists, remove bookmark
      await sql`
        DELETE FROM saved_role WHERE role_id = ${jobid} AND employee_id = ${employeeId}`;
      return res.status(200).json({ message: "Bookmark removed successfully!", bookmarked: false });
    } else {
      // If doesn't exist, insert bookmark
      await sql`
        INSERT INTO saved_role (role_id, employee_id, date) VALUES (${jobid}, ${employeeId}, CURRENT_TIMESTAMP)`;
      return res.status(200).json({ message: "Bookmark added successfully!", bookmarked: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Error toggling bookmark", error: error.message });
  }
});

router.get("/api/get-bookmarks/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;
    if (!employeeId) {
      return res.status(400).json({ message: "Missing employee ID" });
    }

    const bookmarks = await sql`
      SELECT role_id FROM saved_role WHERE employee_id = ${employeeId}`;

    res.status(200).json(bookmarks.map(b => b.role_id));
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookmarks", error: error.message });
  }
});







module.exports = router;
