const express = require("express");
const sql = require("../DB/connection"); // Assuming SQL connection module
const router = express.Router();
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


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
            data: {
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
            }
        })

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Endpoint to update current level and calculate the new estimated time
router.post("/api/skills/update-time", async (req, res) => {
    try {
        const { skillId, newLevel } = req.body;

        // Fetch the skill data
        const skillResult = await sql
            `SELECT req_level, current_level, estimated_time FROM Required_Skill WHERE skill_id = ${skillId};`;

        if (skillResult.length === 0) {
            return res.status(404).json({ message: "Skill not found" });
        }

        const skill = skillResult[0];
        const requiredLevel = skill.req_level;
        let estimatedTime = skill.estimated_time;

        // Compare required level and current level to update estimated time
        const levelMapping = {
            "Proficient": 1,
            "Intermediate": 2,
            "Developing": 3,
            "Strong": 1,
            "Basic": 2,
            "Missing": 3
        };

        const diff = levelMapping[requiredLevel] - levelMapping[newLevel];
        if (diff === 0) {
            estimatedTime = 0;
        } else if (diff === 1) {
            estimatedTime = 1;
        } else if (diff === 2) {
            estimatedTime = 2;
        } else {
            estimatedTime = 3;
        }

        // Update the current level and estimated time
        await sql
            `UPDATE Required_Skill SET current_level = ${newLevel}, estimated_time = ${estimatedTime} WHERE skill_id = ${skillId};`;

        res.status(200).json({ estimatedTime });
    } catch (error) {
        console.error("Error updating skill level:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Fetch jobs that match the skill_ids of a role
router.post("/api/jobs/recommended", async (req, res) => {
    try {
        const { skillIds } = req.body;

        if (!skillIds || skillIds.length === 0) {
            return res.status(400).json({ message: "No skills provided" });
        }

        // Fetch jobs where required_skill array contains any of the provided skill IDs
        const jobs = await sql`
            SELECT post_id, role, description, company_name, location, salary, post_date, job_type
            FROM job_post
            WHERE required_skill && ${skillIds}::uuid[];
        `;

        res.status(200).json({ jobs });
    } catch (error) {
        console.error("Error fetching recommended jobs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




const get_info = async (role_id) => {
    const role_info = await sql`
        select role.name as role_name, skill_id
        from role
        where role_id = ${role_id}
        `;
    let skills = "";
    for (const role_id of role_info[0].skill_id) {
        const role = await sql`
            select name
            from required_skill
            where skill_id = ${role_id}
            `;
        skills = skills + role[0].name + ", ";
    }
    skills = skills.slice(0, -2);
    result = {
        "role_name": role_info[0].role_name,
        "skills": skills
    };
    return result;
}


router.get("/api/skill-info", async (req, res) => {
    const role_id = req.query.role_id;
    const info = await get_info(role_id);
    console.log(info);
    const prompt =
        `I want to become a ${info.role_name}. What is the required level(level should be in between beginner to Expert, there will be total 5 category of level) of these ${info.skills} for this role? Let me know the learning resources (just give me the resource name) and the action I should take to improve my skills and what is the required estimated time to learn the skill. Ans each of the skills in the following format and don't forget to mention the skill name.And don't put any extra information.
        [  
            {
                "skill_name": "Java",
                "required_level": "Expert",
                "learning_resources": ["Resource 1", "Resource 2"],
                "action": "Description of the action",
                "required_time": "4 weeks",
            }
        ]    
        `;

    try {
        const result = await model.generateContent(prompt);
        let responseText = result.response.text().replace(/```json|```/g, "").trim();
        const response = JSON.parse(responseText);
        console.log(response);
        res.status(200).send({ response });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;