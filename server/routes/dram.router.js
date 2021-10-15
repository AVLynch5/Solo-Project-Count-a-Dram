const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//POST
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    let whiskeyID;
    switch (req.body.whiskeyExists) {
        case false:
            const insertWhiskeyQuery = `
                INSERT INTO "whiskey" ("whiskey_name", "whiskey_proof")
                VALUES ($1, $2)
                RETURNING "id";`;
            pool.query(insertWhiskeyQuery, [req.body.name, req.body.proof])
            .then((result) => {
                console.log(result.rows[0].id);
                whiskeyID = result.rows[0].id;
                console.log(whiskeyID, 'woooo');
                const insertDramQuery = `
                    INSERT INTO "dram" ("user_id", "whiskey_id", "dram_quantity", "dram_calories")
                    VALUES ($1, $2, $3, $4);`;
                pool.query(insertDramQuery, [req.user.id, whiskeyID, req.body.quantity, req.body.calories])
                    .then((result) => {
                        res.sendStatus(201);
                    })
                    .catch((error) => {
                        console.log('Error POSTing new dram', error);
                        res.sendStatus(500);
                    });
            })
            .catch((error) => {
                console.log('Error creating new whiskey', error);
            })
            break;
        case true:
            whiskeyID = req.body.whiskeyID;
            console.log(whiskeyID, 'woooo');
            const insertDramQuery = `
                INSERT INTO "dram" ("user_id", "whiskey_id", "dram_quantity", "dram_calories")
                VALUES ($1, $2, $3, $4);`;
            pool.query(insertDramQuery, [req.user.id, whiskeyID, req.body.quantity, req.body.calories])
                .then((result) => {
                    res.sendStatus(201);
                })
                .catch((error) => {
                    console.log('Error POSTing new dram', error);
                    res.sendStatus(500);
                });
            break; 
    }  
    
})

//GET drams from date
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const dateID = req.params.id;
    const userID = req.user.id;
    const queryText = `
        SELECT "dram"."id", "whiskey"."whiskey_name", "whiskey"."whiskey_proof", "dram"."dram_quantity", "dram"."dram_calories", "dram"."dram_date"
        FROM "whiskey"
        INNER JOIN "dram"
        ON "whiskey"."id" = "dram"."whiskey_id"
        WHERE ("dram"."dram_date" = $1 AND "dram"."user_id" = $2)
        ORDER BY "dram"."dram_time" ASC;`;
    pool.query(queryText, [dateID, userID])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error GETting data from date', error);
            res.sendStatus(500);
        });
})

module.exports = router;