const express = require("express");
const sql = require("../DB/connection"); // Assuming SQL connection module
const router = express.Router();

// Fetch Roles with Required Skills
router.get("/api/roles/:roleId", async (req, res) => {
    try {
        const { roleId } = req.params;
        
        // Fetch skill_id array from Role table
        const roleResult = await sql`
            SELECT role_id, name AS role_name, category, description, skill_id
            FROM Role
            WHERE role_id = ${roleId};
        `;
        
        if (roleResult.length === 0) {
            return res.status(404).json({ message: "Role not found" });
        }
        
        const role = roleResult[0];
        const skillIds = role.skill_id;
        
        let skills = [];

        // Fetch skill details for each skill_id using a loop
        if (skillIds && skillIds.length > 0) {
            for (const skillId of skillIds) {
                const skillData = await sql`
                    SELECT skill_id, name AS skill_name, req_level, learning_resource, 
                           action, action_details, current_level, estimated_time
                    FROM Required_Skill
                    WHERE skill_id = ${skillId};
                `;
                if (skillData.length > 0) {
                    skills.push(skillData[0]);
                }
            }
        }
        res.status(200).send({
            data:{
                role_id: role.role_id,
                role_name: role.role_name,
                category: role.category,
                description: role.description,
                skills: skills.map(skill => ({
                    skill_id: skill.skill_id,
                    name: skill.skill_name,
                    requiredLevel: skill.req_level,
                    learningResources: skill.learning_resource,
                    action: skill.action,
                    actionDetails: skill.action_details,
                    currentLevel: skill.current_level,
                    estimatedTime: skill.estimated_time
                }))
     }})
    
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;