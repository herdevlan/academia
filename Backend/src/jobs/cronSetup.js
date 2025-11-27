// cronSetup.js
const cron = require('node-cron');
const { runBackup } = require('./backupJob.js');
const dotenv = require('dotenv');
dotenv.config();

if (process.env.BACKUP_ENABLED === "true") {
  let cronExpr;

  if (process.env.BACKUP_FREQUENCY === "TEST") {
    cronExpr = "* * * * *"; // cada minuto
    console.log("[CRON] Modo test: backup cada minuto activo");
  } else if (process.env.BACKUP_FREQUENCY === "hourly") {
    cronExpr = "0 * * * *"; // cada hora
  } else if (process.env.BACKUP_FREQUENCY === "weekly") {
    cronExpr = "0 3 * * 0"; // domingos 3 AM
  } else {
    cronExpr = "0 2 * * *"; // default: diario 2 AM
  }

  cron.schedule(cronExpr, () => {
    console.log("[CRON] iniciando backup automático");
    runBackup();
  });
}