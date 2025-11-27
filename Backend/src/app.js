const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("./jobs/cronSetup.js");        // Cron de backups
const authRoutes = require("./routes/auth.js");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: "OK", timestamp: Date.now() });
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

module.exports = app; // exportar app para tests






