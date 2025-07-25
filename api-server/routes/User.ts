import express, { Request, Response, Router } from "express";
import mysql from "mysql2/promise";
import crypto from "crypto";
import { sendProductOwnerInviteEmail } from "../utils/emailService.js";

import {sendUserInviteEmail} from "../utils/emailService.js";

const router: Router = express.Router();

// POST /api/user/invite
router.post("/invite", async (req: Request, res: Response): Promise<void> => {
  const { FirstName, LastName, Email } = req.body;

  if (!FirstName || !LastName || !Email) {
    res.status(400).json({ error: "Missing required fields." });
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

    const token = crypto.randomBytes(32).toString("hex");
    const inviteLink = `${process.env.FRONTEND_URL}/register?token=${token}`;

    await connection.execute(
      `INSERT INTO user (FirstName, LastName, Email, UserTypeId, IsActive, CreatedOn)
       VALUES (?, ?, ?, 3, 0, NOW())`,
      [FirstName, LastName, Email]
    );

    await sendUserInviteEmail(Email, FirstName, inviteLink);
    await connection.end();

    res.status(200).json({ message: "Invitation sent." });
  } catch (err: any) {
    console.error("Invite error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/user — fetch all users (for company admin panel)
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: Number(process.env.MYSQL_PORT),
      ssl: { rejectUnauthorized: false },
    });

    const [rows] = await connection.execute(
      "SELECT UserId, FirstName, LastName, Email, UserTypeId, IsActive FROM user ORDER BY LastName, FirstName"
    );

    await connection.end();
    res.status(200).json(rows);
  } catch (err: any) {
    console.error("User fetch error:", err);
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

// PUT /api/User/:id — Invite a product owner user 

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const { FirstName, LastName, Email, IsActive } = req.body;

  if (!FirstName || !LastName || !Email) {
    res.status(400).json({ error: "Missing required fields." });
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
      `UPDATE user SET FirstName = ?, LastName = ?, Email = ?, UserTypeId = ?,IsActive = ? WHERE UserId = ?`,
      [FirstName, LastName, Email, IsActive ? 1 : 0, userId]
    );

    await connection.end();
    res.status(200).json({ message: "User updated successfully." });
  } catch (err) {
    console.error("Failed to update user:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/invite-product-owner", async (req: Request, res: Response): Promise<void> => {
  const { FirstName, LastName, Email } = req.body;

  if (!FirstName || !LastName || !Email) {
    res.status(400).json({ error: "Missing required fields." });
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

    const token = crypto.randomBytes(32).toString("hex");
    const inviteLink = `${process.env.FRONTEND_URL}/register?token=${token}`;

    await connection.execute(
      `INSERT INTO user (FirstName, LastName, Email, UserTypeId, IsActive, CreatedOn)
       VALUES (?, ?, ?, 1, 0, NOW())`,
      [FirstName, LastName, Email]
    );

    await sendProductOwnerInviteEmail(Email, FirstName, inviteLink);
    await connection.end();

    res.status(200).json({ message: "Product owner invitation sent." });
  } catch (err: any) {
    console.error("Invite error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});


export default router;
