const express = require('express');
const router = express.Router();


const db = require('../config/database');

router.get('/', (req, res) => {


  const query = 'SELECT * FROM users';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    
    res.render('index', { users: results });
  });
});

module.exports = router;