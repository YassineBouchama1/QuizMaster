const db = require('../config/database');

exports.getAllLevels = (callback) => {
  const sql = 'SELECT * FROM levels';
  db.query(sql, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

exports.addLevel = (levelData, callback) => {
  const { description, min, max } = levelData;
  const sql = 'INSERT INTO levels (description, min, max) VALUES (?, ?, ?)';
  db.query(sql, [description, min, max], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

exports.getLevelById = (id, callback) => {
  const sql = 'SELECT * FROM levels WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result[0]);
  });
};

exports.updateLevel = (id, levelData, callback) => {
  const { description, min, max } = levelData;
  const sql = 'UPDATE levels SET description = ?, min = ?, max = ? WHERE id = ?';
  db.query(sql, [description, min, max, id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

exports.deleteLevel = (id, callback) => {
  const sql = 'DELETE FROM levels WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};
