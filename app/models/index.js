const mysql = require('mysql2');
const config = require('../config/configDatabase'); // Mengimpor konfigurasi database

// Ambil lingkungan aktif (default ke 'development' jika NODE_ENV tidak diatur)
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

if (!dbConfig) {
  console.error(`Database configuration for environment '${env}' not found.`);
  process.exit(1); // Keluar dari aplikasi jika konfigurasi tidak ditemukan
}

// Membuat koneksi ke database menggunakan konfigurasi
const connection = mysql.createConnection({
  host: "mysql-1f0961d0-keeansportodb.b.aivencloud.com",
  user: "avnadmin",
  password: process.env.DB_PASSWORD,
  database: "portofolio_dev",
  port: "15009", // Default port MySQL adalah 3306
  ssl: {
    "require": true,
    "rejectUnauthorized": false
  }// Tambahkan SSL jika diperlukan
});

// Cek koneksi ke database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log(`Connected to the ${env} database`);
});

// Ekspor koneksi untuk digunakan di file lain
module.exports = connection;
