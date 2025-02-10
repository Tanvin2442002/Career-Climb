const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();

const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.get("/roadmap", async (req, res) => {

    const from = req.query.from;
    const to = req.query.to;

    console.log("Generating......");
    const prompt = `Generate a structured array of object dataset representing a learning roadmap for ${from} to ${to}. Each core concept should have an id, a name, and a details array containing key concepts. Include at least 10 core concept covering all possible areas. Ensure each core concept has at most 10 and at least 10 detailed points and there must be even number of detailed points and each of the details should not exit 20 words and try to use small words.
    You can follow this JSON schema: 
        [
            {
            "id": 1,
            "name": "",
            "details": ["", ""]
            },
        ]
    `;

    try {
        const result = await model.generateContent(prompt);
        let responseText = result.response.text().replace(/```json|```/g, "").trim();
        const response = JSON.parse(responseText);
        console.log("Generated successfully");
        res.status(200).send({ response });
    } catch (err) {
        console.error("Error generating roadmap:", err);
        res.status(500).send({ message: "Error generating roadmap" });
    }
});


router.get("/find/roadmap", async (req, res) => {

    const from = req.query.from.toUpperCase();
    const to = req.query.to.toUpperCase();
    const user_id = req.query.user_id;

    console.log("From: ", from, "To: ", to, "User ID: ", user_id);

    const result = await sql`SELECT data FROM roadmap WHERE user_id = ${user_id} AND from_role = ${from} AND to_role = ${to}`;

    if (result.length === 0) {
        res.status(220).send({ message: "Roadmap not found" });
    } else {
        res.status(200).send({ roadmap: result[0].data });
    }
});

router.post("/save/roadmap", async (req, res) => {
    const from = req.body.from.toUpperCase();
    const to = req.body.to.toUpperCase();
    const user_id = req.body.user_id;
    const roadmap = req.body.roadmap;

    const result = await sql`INSERT INTO roadmap (from_role, to_role, user_id, data) VALUES (${from}, ${to}, ${user_id}, ${roadmap})`;

    if (result) {
        res.status(201).send({ message: "Roadmap saved successfully" });
    } else {
        res.status(400).send({ message: "Error saving roadmap" });
    }

});


router.get("/roadmap/details", async (req, res) => {

    const from = req.query.from;
    const to = req.query.to;
    const coreConcept = req.query.details;
    // console.log("From: ", from, "To: ", to, "Core Concept: ", coreConcept);
    const prompt = `
        I am currently a ${from} and want to transition into a ${to} role. I understand that mastering ${coreConcept} is essential for to become a/an ${to}.

        Generate a structured learning roadmap that includes:

        Introduction to ${coreConcept} – Briefly explain ${coreConcept} with real-world examples.
        Importance in ${to} role – Describe how applying ${coreConcept} improves software design and scalability.
        Free Learning Resources – Provide a curated list of high-quality, free resources, including online courses, tutorials, GitHub projects, books, and YouTube channels to learn ${coreConcept}.
        Practical Application – Suggest hands-on exercises, coding challenges, or real-world scenarios where these principles can be applied.
        Next Steps – After mastering SOLID, recommend additional concepts (e.g., design patterns, system design, microservices) to deepen architectural expertise.
        Ensure the response is structured, practical, and beginner-friendly, with actionable steps for continuous learning.

        You can follow this JSON schema:
        
        [
            "introduction":{
                "title": "",
                "description": ""
            },
            "importance": {
                "title": "",
                "description": ""
            },
            "resources": [{
                "title": "",
                "description": "Description of the website or resource",
            }],
            "application": [{
                "title": "",
                "description": ""
            }],
            "nextSteps": [{
                "concept": "",
                "description": ""
            }]
        ]   
    `;
    const result = await model.generateContent(prompt);
    let responseText = result.response.text().replace(/```json|```/g, "").trim().replace(/\*/g, " ");
    const response = JSON.parse(responseText);
    res.status(200).send({ response });
});

module.exports = router;