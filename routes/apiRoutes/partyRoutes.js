const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Get all parties
// cHANGED TO rOUTER. GET app.get('/api/parties', (req, res) => {
  router.get('/parties', (req, res) => {
  const sql = `SELECT * FROM parties`;
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: rows
    });
  });
});

//ROUTE FOR A SINGLE PARTY
// CHANGED TO ROUTER.GET app.get('/api/party/:id', (req, res) => {
router.get('/party/:id', (req, res) => {
  const sql = `SELECT * FROM parties WHERE id = ?`;
  const params = [req.params.id];
  db.get(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: rows
    });
  });
});

//ROUTE TO REMOVE A ROW FROM PARTIES TABLE
// CHANGED TO ROUTER.DELETE app.delete('/api/party/:id', (req, res) => {
router.delete('/party/:id', (req, res) => {
  const sql = `DELETE FROM parties WHERE id = ?`;
  const params = [req.params.id]
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }

    res.json({ message: 'successfully deleted', changes: this.changes });
  });
});

module.exports = router;