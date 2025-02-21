const express = require("express");
const sql = require("../DB/connection");
const moment = require("moment");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

router.post("/create-notification", async (req, res) => {
  try {
    const { userId, senderId, jobId, user_type, type, status, employerName, role, employeeName} = req.body;
    let details;
    if (type === "application_status") {
      if (status === "Viewed") {
        details = `Your application has been viewed by  by ${employerName} for the role ${role}`;
      } else if (status === "Accepted") {
        details = `Congratulations, Your application has been accepted by ${employerName} for the role ${role}!`;
      } else if (status === "Rejected") {
        details = `Sorry :c ,Your application has been rejected by ${employerName} for the role ${role}`;
      }
    } else {
      details = `${employeeName} applied for the ${role} role`;
    }
    if (!userId || !senderId || !jobId || !user_type || !type || !status || !details) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await sql`
      INSERT INTO notification (details, sender_id, user_type, receiver_id, type, status, job_post_id)
      VALUES (${details}, ${userId}, ${user_type}, ${senderId}, ${type}, ${status}, ${jobId}) RETURNING *`;


    if (!result || result.length === 0) {
      throw new Error("Error in creating notification");
    }

    res.status(201).json({
      message: "Notification created successfully",
      notification: result[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error during notification creation",
      error: err.message
    });
  }
});


router.get("/notifications/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await sql`
      SELECT * FROM notification WHERE receiver_id = ${userId} ORDER BY time DESC
    `;
    
      const notificationsWithImages = await Promise.all(
      result.map(async (notification) => {
        const imageResult = await sql`
          SELECT profile_pic FROM user_info WHERE user_id = ${notification.sender_id}
        `;      
        return {
          ...notification,
          image_link: imageResult.length > 0 ? imageResult[0].profile_pic : null,
          time_ago: moment(notification.time).add(6, 'hours').fromNow()
        };
      })
    );
    res.status(200).json({
      message: "Notifications fetched successfully",
      notifications: notificationsWithImages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching notifications",
      error: err.message,
    });
  }
});

router.get("/notifications/count/:userId", async (req, res) => {
  const { userId } = req.params;
  try{
    const result = await sql`
      SELECT COUNT(*) as unseen FROM notification WHERE receiver_id = ${userId} AND unseen = FALSE
    `;
    res.status(200).json(result[0]);
  }
  catch(err){
    console.error(err);
    res.status(500).json({
      message: "Error fetching notification count",
      error: err.message
    });
  }
});

router.post("/notifications/update", async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
  }

  try {
      const result = await sql
          `UPDATE notification SET unseen = TRUE WHERE receiver_id = ${userId}`;

      res.json({ success: true, message: "Notifications updated!" });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;
