const Level = require('../models/levelModel');

exports.getLevels = (req, res) => {
  Level.getAllLevels((err, levels) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des niveaux' });
    }
    res.render('levels/index', { levels });
  });
};

exports.getNewLevelForm = (req, res) => {
  res.render('levels/new');
};

exports.createLevel = (req, res) => {
  const levelData = req.body;
  Level.addLevel(levelData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de l’ajout du niveau' });
    }
    res.status(201).json({ message: 'Niveau ajouté avec succès' });
  });
};

exports.getEditLevelForm = (req, res) => {
  const levelId = req.params.id;
  Level.getLevelById(levelId, (err, level) => {
    if (err || !level) {
      return res.status(404).json({ error: 'Niveau non trouvé' });
    }
    res.render('levels/edit', { level });
  });
};

exports.updateLevel = (req, res) => {
  const levelId = req.params.id;
  const levelData = req.body;
  Level.updateLevel(levelId, levelData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la mise à jour du niveau' });
    }
    res.status(200).json({ message: 'Niveau mis à jour avec succès' });
  });
};

exports.deleteLevel = (req, res) => {
  const levelId = req.params.id;
  Level.deleteLevel(levelId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la suppression du niveau' });
    }
    res.status(200).json({ message: 'Niveau supprimé avec succès' });
  });
};
