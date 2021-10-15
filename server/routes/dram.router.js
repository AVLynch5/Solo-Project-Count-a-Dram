const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//POST
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    //Phase 1: Check "whiskey" for entries matching the user's inputted information
    const searchQuery = `SELECT * FROM "whiskey" WHERE ("whiskey_name" = $1 AND "whiskey_proof" = $2);`;
    pool.query(searchQuery, [req.body.name, req.body.proof])
        .then((result) => {
            //if result.rows.length == 0, whiskey does not exist. If result.rows.length == 1, whiskey does exist
            const whiskeyExists = (result.rows.length == 1 ? true : false);
            //Phase 2: If whiskeyExists false, must POST user inputted info into "whiskey" and return id, then POST dram info. If whiskeyExists true, can pull id from result.rows and POST dram info.
            switch (whiskeyExists) {
                case false:
                    const insertWhiskeyQuery = `
                        INSERT INTO "whiskey" ("whiskey_name", "whiskey_proof")
                        VALUES ($1, $2)
                        RETURNING "id";`;
                    pool.query(insertWhiskeyQuery, [req.body.name, req.body.proof])
                        .then((result) => {
                            console.log(result.rows[0].id);
                            const whiskeyID = result.rows[0].id;
                            console.log(whiskeyID, 'woooo');
                            //Here's where whiskeyID is used to POST dram info
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
                    //Since whiskeyExists true, can pull existing id from matching object @ result.rows.id
                    const whiskeyID = result.rows[0].id;
                    console.log(whiskeyID, 'woooo');
                    //Here's where whiskeyID is used to POST dram info
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
        .catch((error) => {
            console.log('Error GETting whiskey info from DB', error);
        });
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

//DELETE dram with ID
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const dramID = req.params.id;
    const userID = req.user.id;
    const queryText = `DELETE FROM "dram" WHERE ("id" = $1 AND "user_id" = $2);`;
    pool.query(queryText, [dramID, userID])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error DELETEing data', error);
            res.sendStatus(500);
        });
})

module.exports = router;