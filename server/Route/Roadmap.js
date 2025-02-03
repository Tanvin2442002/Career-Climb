const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();

const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.get("/roadmap", async (req, res) => {

    const from = req.query.from;
    const to = req.query.to;
    console.log("From: ", from, "To: ", to);
     const prompt = `Generate a structured array of object dataset representing a learning roadmap for ${from} to ${to}. Each core concept should have an id, a name, and a details array containing key concepts. Include at least 10 core concept covering all possible areas. Ensure each core concept has at least 10 detailed points and each of the details should not exit 15 words.
    You can follow this JSON schema: 
        [
            {
            "id": 1,
            "name": "",
            "details": ["", ""]
            },
        ]
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text().replace(/```json|```/g, "").trim();
    const response = JSON.parse(responseText);
    console.log(response);
    res.status(200).send({ response });
});



router.get("/roadmap/details", async (req, res) => {

    const from = req.query.from;
    const to = req.query.to;
    const coreConcept = req.query.details;
    console.log("From: ", from, "To: ", to, "Core Concept: ", coreConcept);
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
    // console.log(result);
    let responseText = result.response.text().replace(/```json|```/g, "").trim().replace(/\*/g, " ");
    // console.log(responseText);
    const response = JSON.parse(responseText);
    console.log(response);
    res.status(200).send({ response });
});

module.exports = router;