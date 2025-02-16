const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { default: useData } = require("../../client/src/Component/Roadmap/Data");

router.get("/getnotifications/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;
    //console.log(useruuid);
    const response =
      await sql`SELECT details from notification where receiver_id = ${useruuid}`;
    console.log(response);
    res.json(response);
  } catch (err) {
    console.error("Failed getting notifications", err);
  }
});
router.get("/getchartdatatotaljobs/:useruuid", async (req, res) => {
  try {
    const { useruuid } = req.params;
    console.log(useruuid);
    const response =
      await sql`SELECT COUNT(application_id) where employee_id = ${useruuid}`;
    console.log(response);
    res.json(response);
  } catch (err) {
    console.error("Failed in getting total number of jobs", err);
  }
});
module.exports = router;
