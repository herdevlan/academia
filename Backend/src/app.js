// src/app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("./jobs/cronSetup.js"); // Cron de backups

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: Date.now() });
});

// Rutas de autenticación
const authRoutes = require("./routes/auth.js");
app.use("/api/auth", authRoutes);

// Rutas de administración de usuarios (solo para admins)
const adminUserRoutes = require("./routes/adminUserRoutes");
app.use("/api/admin/users", adminUserRoutes);

// Si en algún momento agregas rutas generales de usuarios
// const userRoutes = require("./routes/userRoutes");
// app.use("/api/users", userRoutes);

module.exports = app; // exportar app para server.js o tests
