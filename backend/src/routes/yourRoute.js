const express = require('express');
const router = express.Router();

// Contoh rute untuk mendapatkan semua pengguna
router.get('/users', (req, res) => {
    res.send('Get all users');
});

// Contoh rute untuk membuat pengguna baru
router.post('/users', (req, res) => {
    // Logic untuk membuat pengguna baru
    res.send('Create a new user');
});

module.exports = router;
