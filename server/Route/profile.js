const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();

router.get("/api/employer", async (req, res) => {
    const  uuid  = req.query.id;

    const  data = await sql`SELECT * FROM employer WHERE employer_id = ${uuid}`;

    console.log(uuid);
    if (data.length === 0) {
        res.status(220).send({ message: "data not found" });
    } else {
        res.json(data);
    }
    

    
});




module.exports = router;