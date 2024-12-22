const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/users'); // Import rute users
const app = express();

// Konfigurasi CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Ganti dengan URL frontend Anda
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Izinkan pengiriman cookies atau session
};

// Middleware
app.use(cors(corsOptions)); // Terapkan CORS dengan pengaturan yang benar
app.use(bodyParser.json()); // Parse JSON di body request

// Rute
app.use('/api', authRoutes); // Menyambungkan route /api ke authRoutes

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
