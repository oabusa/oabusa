// api-server/server.ts
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";




// ESM-compatible __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load environment variables from .env file in development
if (process.env.NODE_ENV !== "production") {
  console.log("✅ Loading environment variables from .env file");
  dotenv.config({
    path: path.resolve(__dirname, "../../.env"),
  });
}


import express from "express";
import loginRoute from "./routes/login.js";
import waitlistRouter from "./routes/Waitlist.js";
import companyRoutes from "./routes/Company.js";
import userRoutes from "./routes/User.js";

const app = express();
app.use(express.json());

// ✅ Serve static frontend from Vite's build output
app.use(express.static(path.resolve(__dirname, "public")));

// ✅ API routes
app.use("/api/login", loginRoute);
app.use("/api/waitlist", waitlistRouter);
app.use("/api/company", companyRoutes);
app.use("/api/user", userRoutes);

// ✅ Fallback route — for React Router to handle SPA routes
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// ✅ Debug info
console.log("✅ DB config:", {
  user: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
