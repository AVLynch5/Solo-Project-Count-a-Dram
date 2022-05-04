const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const {processWhiskeyList} = require(`../modules/WhiskeyListArrToObj`);

//GET
router.get('/', rejectUnauthenticated, async (req, res) => {
    const userID = req.user.id;
    const queryText = `
        SELECT "whiskey"."whiskey_name", "whiskey"."whiskey_type", "whiskey"."whiskey_proof"
        FROM "whiskey"
        WHERE "whiskey"."user_id" = $1
        ORDER BY "whiskey"."whiskey_name" ASC;`;
    pool.query(queryText, [userID])
        .then((result) => {
            const resultObj = processWhiskeyList(result.rows);
            res.send(resultObj);
        })
        .catch((error) => {
            console.log('Error GETting whiskies', error);
            res.sendStatus(500);
        });
})

module.exports = router;