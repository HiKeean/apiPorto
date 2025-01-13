const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Format log
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Konfigurasi logger
const logger = createLogger({
  format: combine(
    timestamp(), // Tambahkan timestamp
    logFormat    // Gunakan format kustom
  ),
  transports: [
    new transports.Console(), // Tampilkan log di console
    new transports.File({ filename: 'logs/app.log' }), // Simpan log ke file
  ],
});

module.exports = logger;
