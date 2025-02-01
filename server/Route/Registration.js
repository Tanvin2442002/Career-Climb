const express = require("express");
const sql = require("../DB/connection");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

router.post("/signup", async (req, res) => {
  try {
    const {userType, username, email, password, company, role } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    let result;
    if(userType === "employee"){
      result = await sql`INSERT INTO employee (employee_id,name,email) VALUES (${userId},${username},${email})`;
    }
    else{
      result = await sql`INSERT INTO employer (employer_id,full_name,email,company,role) VALUES (${userId},${username},${email},${company},${role}) RETURNING *`;
    }

    if(!result){
      throw new Error("Error in Registering User");
    }

    const loginResult = await sql`INSERT INTO login (email,user_type,password) VALUES (${email},${userType},${hashedPassword}) RETURNING *`;

    if(!loginResult){
      throw new Error("Error in Registering User");
    }

    res.status(201).send({
      message: "User Registered Successfully",
      data: result,
      login: loginResult
    })

  } catch (err) {
    
    res.status(500).send({ message: "Error during user registration", error: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await sql`SELECT * FROM login WHERE email = ${email}`;
    
    if (user.length === 0) return res.status(401).json({ message: "Invalid email or password" });

    const passwordMatch = await bcrypt.compare(password, user[0].password);
    if (!passwordMatch) return res.status(401).json({ message: "Invalid email or password" });

    res.status(200).json({ message: "Login successful", userType: user[0].user_type });
    
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err.message });
  }
});




module.exports = router;