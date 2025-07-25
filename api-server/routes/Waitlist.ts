import express, { Request, Response, Router } from "express";
import mysql from "mysql2/promise";
import { sendConfirmationEmail } from "../utils/emailService.js";
import { sendWaitlistReminderEmail } from "../utils/emailService.js";

const router: Router = express.Router();

const handleWaitlistSubmission = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { fullName, email, company, role } = req.body;

  if (!fullName || !email) {
    res.status(400).json({ error: "Full name and email are required." });
    return;
  }

  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: Number(process.env.MYSQL_PORT),
      ssl: { rejectUnauthorized: false },
    });

    await connection.execute(
      "INSERT INTO contact (FullName, Email, Company, Role) VALUES (?, ?, ?, ?)",
      [fullName, email, company || null, role || null]
    );

    await connection.end();

    // ✅ Use Resend for email
    await sendConfirmationEmail(email, fullName);

    res.status(201).json({ message: "Contact added and email sent." });
  } catch (err: any) {
    console.error("Waitlist submission error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

router.post("/", handleWaitlistSubmission);


export default router;

const handleWaitlistReminder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, fullName } = req.body; // ✅ include fullName

  if (!email || !fullName) {
    res.status(400).json({ error: "Email and full name are required." });
    return;
  }

  try {
    await sendWaitlistReminderEmail(email, fullName); // ✅ pass both arguments
    res.status(200).json({ message: "Reminder email sent." });
  } catch (err: any) {
    console.error("Waitlist reminder error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

router.post("/:id/reminder", handleWaitlistReminder); // ✅ make sure this route is registered
