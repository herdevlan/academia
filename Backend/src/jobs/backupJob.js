// backupJob.js
const { exec } = require('child_process');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

function runBackup() {
  console.log("[CRON] iniciando backup automático");

  const file = `backup_${Date.now()}.sql`;
  const filePath = path.join(process.env.BACKUP_LOCAL_PATH, file);

  const cmd = `pg_dump -U ${process.env.DB_USER} ${process.env.DB_NAME} > "${filePath}"`;

  exec(cmd, { env: { ...process.env, PGPASSWORD: process.env.DB_PASSWORD } }, (err) => {
    if (err) console.log("Error backup:", err);
    else console.log("Backup generado:", filePath);
  });
}

// Solo ejecutar automáticamente si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  runBackup();
}

module.exports = { runBackup };
