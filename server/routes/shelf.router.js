const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "item"`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

/**
 * Add an item for the logged in user to the shelf
 */
  router.post('/', (req, res) => {
    const userId = req.user.id;
    const {description,NewImage} = req.body
    let queryText = `INSERT INTO "item" ("description", "image_url", "user_id") VALUES ($1, $2, $3) RETURNING *`;
    const values =[description,NewImage,userId];
    pool.query(queryText, values).then((result) => {
      res.status(201).send(result.rows[0]);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });  
  });

/**
 * Delete an item
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
  let {id} = req.params;
    const sqlText = `DELETE FROM "item" WHERE "id" = $1;`;
    pool.query(sqlText, [id])
        .then((result) => {
            console.log(`Got stuff back from the database`, result);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
});

module.exports = router;
