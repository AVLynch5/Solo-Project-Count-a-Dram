const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) =>  {
    const queryText = `SELECT * FROM "whiskey" ORDER BY "id" ASC;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error getting whiskies', error);
            res.sendStatus(500);
        });
});

module.exports = router;