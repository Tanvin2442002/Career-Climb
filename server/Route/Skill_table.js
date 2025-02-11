const express = require("express");
const sql = require("../DB/connection"); // Assuming SQL connection module
const router = express.Router();

// Fetch Roles with Required Skills
router.get("/api/roles/:roleId", async (req, res) => {
    try {
        const { roleId } = req.params;
        const result = await sql`
            SELECT r.role_id, r.name AS role_name, r.category, r.description, 
                   s.skill_id, s.name AS skill_name, s.req_level, s.learning_resource, 
                   s.action, s.action_details, s.current_level, s.estimated_time
            FROM Role r
            LEFT JOIN Required_Skill s ON r.skill_id = s.skill_id
            WHERE r.role_id = ${roleId};
        `;

        if (result.length === 0) {
            return res.status(404).json({ message: "Role not found" });
        }

        const role = result[0];
        res.json({
            role_id: role.role_id,
            role_name: role.role_name,
            category: role.category,
            description: role.description,
            skills: result.map(skill => ({
                skill_id: skill.skill_id,
                name: skill.skill_name,
                requiredLevel: skill.req_level,
                learningResources: skill.learning_resource,
                action: skill.action,
                actionDetails: skill.action_details,
                currentLevel: skill.current_level,
                estimatedTime: skill.estimated_time
            }))
        });
    } catch (error) {
        console.error("Error fetching role:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;