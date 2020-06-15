const express = require('express');
const router = express.Router();
const connection = require('../connection');

// get one article by the id
router.get('/:id', (req, res) => {
  const idArticle = req.params.id;
  connection.query('SELECT * FROM article WHERE id = ?', [idArticle], (err, results) => {
    if(err){
      res.json({
        error: err.message,
        sql: sql.err
      });
    }
    res.status(200).json(results);
  })
}); //OK

// get articles by the number of tags passed in the link or get all the articles if the is no filters
router.get('/', (req, res) => {
  const { tags } = req.query;
  if(tags){
    connection.query('SELECT * FROM article WHERE tags = ?', [tags], (err, results) => {
      if(err){
        res.json({
          error: err.message,
          sql: sql.err
        });
      }
      else if(results.length === 0){
        res.status(404).send('article non trouvé');
      }
      else{
        res.status(200).json(results);
      }
    });
  }
  else{
    connection.query('SELECT * FROM article ORDER BY title', (err2, records) => {
      if(err2){
        res.json({
          error: err2.message,
          sql: sql.err2
        });
      }
      res.status(200).json(records);
    });
  }
}); //OK

// create a new article
router.post('/', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO article SET ?', [formData], (err, _) => {
    if(err){
      res.json({
        error: err.message,
        sql: err.sql
      });
    }
    res.send('Votre nouvel article a bien été enregistré !');
  })
}); //OK

// update an article by the id
router.put('/:id', (req, res) => {
  const formData = req.body;
  const idArticle = req.params.id;
  connection.query('UPDATE article SET ? WHERE id = ?', [formData, idArticle], (err, _) => {
    if(err){
      console.log(err);
      return res.status(500).json({
        error: 'Une erreur s\'est produite lors de la mise à jour de l\'article'
      });
    }
    return res.status(200).json({
      message: 'L\'article a bien été mis à jour !'
    });
  })
}); //OK

// update the boolean "online"
router.put('/:id', (req, res) => {
  const online = req.body;
  const idArticle = req.params.id;
  connection.query('UPDATE article SET ? WHERE id = ?', [online, idArticle], (err, _) => {
    if(err){
      console.log(err);
      return res.status(500).json({
        error: `Une erreur s'est produite lors de la mise à jour de l'article`
      });
    }
    connection.query('SELECT * FROM article', [idArticle], (err2, records) => {
      if(err2){
        console.log(err);
        res.json({
          error: err2.message,
          sql: err2.sql
        });
      }
      res.json(records[0]);
    })
  })
});// 0 = false

// delete an article by the id
router.delete('/:id', (req, res) => {
  const idArticle = req.params.id;
  connection.query('DELETE FROM article WHERE id = ?', [idArticle], (err, results) => {
    if(err){
      res.json({
        error: err.message,
        sql: err.sql
      });
    }
    res.send('L\'article a bien été supprimé !');
  })
}); //OK

// delete an article by the id and where the boolean is false
router.delete('/:id/:online', (req, res) => {
  const idArticle = req.params.id;
  const booleanArticle = req.params.online;
  connection.query('DELETE FROM article WHERE id = ? AND online = false', [idArticle, booleanArticle], (err, results) => {
    if(err){
      res.json({
        error: err.message,
        sql: err.sql
      });
    }
    res.send('L\'article qui n\'était pas en ligne a bien été supprimé !');
  })
}); //OK

module.exports = router;