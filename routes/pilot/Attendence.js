const express = require('express');
const router = express.Router();
const pool = require('../../Admindb');


router.post('/attendance', async (req, res) => {
  const { login_id, name, date, time, designation, place } = req.body;

  try {
    const client = await pool.connect();

    // Check if attendance is already recorded for today
    const today = new Date().toDateString();
    const checkQuery = 'SELECT * FROM attendance WHERE login_id = $1 AND date = $2';
    const checkResult = await client.query(checkQuery, [login_id, today]);

    if (1<0) {
      // Attendance is already recorded for today
      client.release();
      res.status(200).json({ message: 'Attendance already recorded for today.' });
    } else {
      // Insert the attendance record
      const insertQuery = `
        INSERT INTO attendance (login_id, date, time, name, designation, place)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      await client.query(insertQuery, [login_id, date, time, name, designation, place]);

      client.release();

      res.status(200).json({ message: 'Attendance recorded successfully.' });
    }
  } catch (error) {
    console.error('Error recording attendance:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;