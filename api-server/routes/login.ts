import express, { Request, Response, Router } from "express";
import mysql from "mysql2/promise";

const router: Router = express.Router();

// POST /api/login
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
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

    const [rows] = await connection.execute(
      `SELECT UserId, concat(FirstName, ' ' , LastName) Name, Email, Password, UserTypeId 
       FROM user 
       WHERE Email = ?`,
      [email]
    );

    await connection.end();

    console.log("Login request received:", { email, password });
    
    const user = Array.isArray(rows) ? rows[0] as any : null;

    console.log("DB returned user:", user.Name  || "No user found");


    if (!user || user.Password !== password) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    console.log("Incoming login:", email, password);
    console.log("DB returned user:", user);

    console.log("User details:", user.UserId, user.Name, user.UserTypeId);

    res.status(200).json({
      userId: user.UserId,
      userType: user.UserTypeId,
      userName: user.Name,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
