const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const API_KEY = process.env.MAIL_LAYER_API;
var quickemailverification = require("quickemailverification")
  .client(API_KEY)
  .quickemailverification(); // Replace API_KEY with your API Key

router.get("/verify-email", async (req, res) => {
  const { email } = req.query;
  quickemailverification.verify(`${email}`, function (err, response) {
    const data = response.body;
    res.send(data);
  });

});

router.post("/signup", async (req, res) => {
  try {
    const { userType, username, email, password, company, role } = req.body;

    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    let result;
    if (userType === "employee") {
      result =
        await sql`INSERT INTO employee (employee_id,name,email) VALUES (${userId},${username},${email})`;
    } else {
      result =
        await sql`INSERT INTO employer (employer_id,full_name,email,company,role) VALUES (${userId},${username},${email},${company},${role}) RETURNING *`;
    }

    if (!result) {
      throw new Error("Error in Registering User");
    }

    const loginResult =
      await sql`INSERT INTO login (email,user_type,password) VALUES (${email},${userType},${hashedPassword}) RETURNING *`;

    if (!loginResult) {
      throw new Error("Error in Registering User");
    }

    res.status(201).send({
      message: "User Registered Successfully",
      data: result,
      login: loginResult,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error during user registration", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await sql`SELECT * FROM login WHERE email = ${email}`;

    if (user.length === 0)
      return res.status(401).json({ message: "Invalid email or password" });

    const passwordMatch = await bcrypt.compare(password, user[0].password);
    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    res
      .status(200)
      .json({ message: "Login successful", userType: user[0].user_type });
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err.message });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result =
      await sql`UPDATE login SET password = ${hashedPassword} WHERE email = ${email} RETURNING *`;

    if (!result) {
      throw new Error("Error in updating password");
    }

    res.status(200).send({ message: "Password updated successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error during password reset", error: err.message });
  }
});

router.post("/signup-google", async (req, res) => {
  try {
    const { email, userType, userId, name, profile } = req.body;
    const result = await sql`INSERT INTO ${sql(userType)} (${sql(
      userType + "_id"
    )}, email, name, profile_pic) VALUES (${userId}, ${email}, ${name}, ${profile}) RETURNING *`;

    if (result.length === 0) {
      throw new Error("Error in Registering User");
    }

    res.status(201).send({
      message: "User Registered Successfully",
      data: result,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error during user registration", error: err.message });
  }
});

router.get("/employee/:email", async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const result = await sql`
      SELECT employee_id FROM employee WHERE email = ${email} LIMIT 1
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ uuid: result[0].employee_id });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error fetching user UUID", error: err.message });
  }
});

router.get("/employer/:email", async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const result = await sql`
      SELECT employer_id FROM employer WHERE email = ${email} LIMIT 1
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ uuid: result[0].employer_id });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error fetching user UUID", error: err.message });
  }
});


// code for google auth
router.get("/exists-user", async (req, res) => {
  try {
    const { email, type } = req.query;
    console.log(req.query);
    if (!email || !type) {
      console.log("Email and type are required");
      return res.status(400).json({ message: "Email and type are required" });
    }
    const result = await sql`SELECT * FROM user_info WHERE email = ${email} AND user_type = ${type}`;
    return (result.length === 0) ?
      res.status(200).json({ message: "NOT_FOUND", data: {} })
      :
      res.status(201).json({ message: "FOUND", data: result[0] });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user UUID", error: err.message });
  }
});

router.post("/signup/auth", async (req, res) => {
  try {
    const { email, full_name, profile, userType } = req.body;
    const intermidiateData = await sql`
      INSERT INTO user_info (email, name, profile_pic, user_type) VALUES (${email}, ${full_name}, ${profile}, ${userType}) RETURNING *
    `
    const uid = intermidiateData[0].user_id;
    const result = (userType === "employee") ?
      await sql`INSERT INTO employee (employee_id) VALUES (${uid}) RETURNING *`
      :
      await sql`INSERT INTO employer (employer_id) VALUES (${uid}) RETURNING *`;

    if (result.length === 0) {
      throw new Error("Error in insert Table User");
    }
    res.status(200).send({
      message: "User Registered Successfully",
      data: {
        user_id: uid,
        user_type: userType
      }
    });
  } catch (err) {
    res.status(500).send({ message: "Error during user registration", error: err.message });
  }
});

router.get("/fetch-user-id", async (req, res) => {
  try {
    const { email, type } = req.query;
    const result = (type === "employee") ?
      await sql`SELECT employee_id as uuid FROM employee WHERE email = ${email}` :
      await sql`SELECT employer_id as uuid FROM employer WHERE email = ${email}`;

    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User exists", data: result[0] });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user UUID", error: err.message });
  }
});

module.exports = router;
