const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();

const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.get("/roadmap", async (req, res) => {
    const {from, to} = req.query;
     const prompt = `Generate a structured array of object dataset representing a learning roadmap for fresher to software development. Each core concept should have an id, a name, and a details array containing key concepts. Include at least 10 core concept covering all possible areas. Ensure each core concept has at least 6 detailed points.
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

module.exports = router;