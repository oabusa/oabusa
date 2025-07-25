import express, { Request, Response, Router } from "express";
import mysql from "mysql2/promise";
import { sendAdminInviteEmail } from "../utils/emailService.js";

const router: Router = express.Router();

// POST /api/company — Register a new company
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const {
    CompanyName,
    AddressLine1,
    AddressLine2,
    City,
    State,
    ZipCode,
    Phone,
    Email,
    ContactName,
    ContactEmail,
    TaxNumber,
  } = req.body;

  if (!CompanyName || !Email || !ContactName || !ContactEmail) {
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

    const [result] = await connection.execute(
      `INSERT INTO company (
        CompanyName, AddressLine1, AddressLine2, City, State, ZipCode,
        Phone, Email, ContactName, ContactEmail, TaxNumber, IsActive
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [
        CompanyName,
        AddressLine1 || null,
        AddressLine2 || null,
        City || null,
        State || null,
        ZipCode || null,
        Phone || null,
        Email,
        ContactName,
        ContactEmail,
        TaxNumber || null,
      ]
    );

    await connection.end();
    res.status(201).json({ message: "Company registered.", CompanyId: (result as any).insertId });
  } catch (err) {
    console.error("Company registration error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/company — Fetch all companies
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

    const [rows] = await connection.execute("SELECT * FROM company ORDER BY CompanyName");
    await connection.end();

    res.status(200).json(rows);
    
  } catch (err) {
    console.error("Failed to fetch companies:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// PUT /api/company/:id — Update company details
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const companyId = req.params.id;
  const {
    CompanyName,
    AddressLine1,
    AddressLine2,
    City,
    State,
    ZipCode,
    Phone,
    Email,
    ContactName,
    ContactEmail,
    TaxNumber,
  } = req.body;

  if (!CompanyName || !Email || !ContactName || !ContactEmail) {
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
      `UPDATE company
       SET CompanyName = ?, AddressLine1 = ?, AddressLine2 = ?, City = ?, State = ?, ZipCode = ?,
           Phone = ?, Email = ?, ContactName = ?, ContactEmail = ?, TaxNumber = ?, ModifiedOn = CURRENT_TIMESTAMP
       WHERE CompanyId = ?`,
      [
        CompanyName,
        AddressLine1 || null,
        AddressLine2 || null,
        City || null,
        State || null,
        ZipCode || null,
        Phone || null,
        Email,
        ContactName,
        ContactEmail,
        TaxNumber || null,
        companyId,
      ]
    );

    await connection.end();
    res.status(200).json({ message: "Company updated." });
  } catch (err) {
    console.error("Failed to update company:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// PUT /api/company/:id/activate — Activate and invite admin
router.put("/:id/activate", async (req: Request, res: Response): Promise<void> => {
  const companyId = req.params.id;

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
      "UPDATE company SET IsActive = 1, ModifiedOn = CURRENT_TIMESTAMP WHERE CompanyId = ?",
      [companyId]
    );

    const [rows]: any = await connection.execute(
      "SELECT ContactEmail, ContactName, CompanyName FROM company WHERE CompanyId = ?",
      [companyId]
    );

    await connection.end();

    if (!rows.length) {
      res.status(404).json({ error: "Company not found." });
      return;
    }

    const { ContactEmail, ContactName, CompanyName } = rows[0];

    await sendAdminInviteEmail(ContactEmail, ContactName, CompanyName);
    res.status(200).json({ message: "Company activated and admin invite sent." });
  } catch (err) {
    console.error("Activation error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
