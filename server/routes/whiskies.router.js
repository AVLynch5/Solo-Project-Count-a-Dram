const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//GET
router.get('/', rejectUnauthenticated, async (req, res) => {
    const userID = req.user.id;
    const queryText = `
        SELECT "whiskey"."whiskey_name", "whiskey"."whiskey_type"
        FROM "whiskey"
        WHERE "whiskey"."user_id" = $1
        ORDER BY "whiskey"."whiskey_name" ASC;`;
    pool.query(queryText, [userID])
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log('Error GETting whiskies', error);
            res.sendStatus(500);
        });
})

module.exports = router;