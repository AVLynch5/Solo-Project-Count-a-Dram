const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const {rearrangeArray} = require(`../modules/resultsArrToObject`);

//POST
/**
 * @api {post} / Create New Dram Entry
 * @apiPermission user
 * @apiName PostNewDram
 * @apiGroup Dram
 * @apiDescription This route creates a new dram entry. Dram entry parameters should be passed through the 
 * request body. UserID should be passed through the request user.
 * 
 * @apiParam {Object} content Mandatory dram information
 * @apiParam {Number} userID Mandatory id of user
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 201 OK
 * 
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
    try {
        const searchQuery = `SELECT * FROM "whiskey" WHERE ("whiskey_name" = $1 AND "whiskey_proof" = $2);`;
        const searchResult = await pool.query(searchQuery, [req.body.name, req.body.proof]);
        const whiskeyExists = (searchResult.rows.length == 1 ? true : false);
        switch (whiskeyExists) {
            case false:
                const insertWhiskeyQuery = `INSERT INTO "whiskey" ("whiskey_name", "whiskey_proof") VALUES ($1, $2) RETURNING "id";`;
                const postResult = await pool.query(insertWhiskeyQuery, [req.body.name, req.body.proof]);
                const whiskeyID1 = postResult.rows[0].id;
                const insertDramQuery1 = `INSERT INTO "dram" ("user_id", "whiskey_id", "dram_quantity", "dram_calories", "dram_epoch") VALUES ($1, $2, $3, $4, $5);`;
                const postResult1 = await pool.query(insertDramQuery1, [req.user.id, whiskeyID1, req.body.quantity, req.body.calories, req.body.timeDate]);
                break;
            case true:
                const whiskeyID2 = searchResult.rows[0].id;  
                const insertDramQuery2 = `INSERT INTO "dram" ("user_id", "whiskey_id", "dram_quantity", "dram_calories", "dram_epoch") VALUES ($1, $2, $3, $4, $5);`;
                const postResult2 = await pool.query(insertDramQuery2, [req.user.id, whiskeyID2, req.body.quantity, req.body.calories, req.body.timeDate]);
                break;
        }
        res.sendStatus(201);
    } catch(error) {
        console.log('Error in POST', error);
        res.sendStatus(500);
    }
})

//GET drams from date
/**
 * @api {get} /:id Dram List
 * @apiPermission user
 * @apiName GetDramsByDate
 * @apiGroup Dram
 * @apiDescription This route returns an array/list of dram objects with a particular dram_date. 
 * The date should be passed through the request params and the user should be passed through the request user.
 * 
 * @apiParam {String} dateID Mandatory date of dram objects to fetch. YYYY-MM-DD format.
 * @apiParam {Number} userID Mandatory id of user
 * 
 * @apiSuccess {Object} dataObject object with data property. object.data is an array of dram objects.
 * 
 */
router.get('/:id', rejectUnauthenticated, async (req, res) => {
    const dateID = req.params.id;
    /* const dateFloor = new Date(+dateID);
    dateFloor.setUTCHours(0, 0, 0, 0);
    const dateCeiling = new Date(+dateID);
    dateCeiling.setUTCHours(23, 59, 59, 999); */
    const dateFloor = parseInt(dateID);
    const dateCeiling = dateFloor + 86400000;
    const userID = req.user.id;
    console.log(dateID, dateFloor, dateCeiling);
    const queryText = `
        SELECT "dram"."id", "whiskey"."whiskey_name", "whiskey"."whiskey_proof", "dram"."dram_quantity", "dram"."dram_calories", "dram"."dram_epoch"
        FROM "whiskey"
        INNER JOIN "dram"
        ON "whiskey"."id" = "dram"."whiskey_id"
        WHERE ("dram"."dram_epoch" BETWEEN $1 AND $2) AND "dram"."user_id" = $3
        ORDER BY "dram"."dram_epoch" ASC;`;
    pool.query(queryText, [dateFloor.valueOf(), dateCeiling.valueOf(), userID])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error GETting data from date', error);
            res.sendStatus(500);
        });
})

//DELETE dram with ID
/**
 * @api {delete} /:id Delete Dram
 * @apiPermission user
 * @apiName DeleteDram
 * @apiGroup Dram
 * @apiDescription This route deletes a dram object with a particular id. 
 * The dramID should be passed through the request params.
 * 
 * @apiParam {Number} userID Mandatory id of user
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 201 OK
 * 
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const dramID = req.params.id;
    //userID kind of unnecessary because only the user's drams are GETted and displayed
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

//PUT - edit dram with dramID using info from payload
/**
 * @api {put} /:id Edit Dram Entry
 * @apiPermission user
 * @apiName EditDram
 * @apiGroup Dram
 * @apiDescription This route edits an existing dram entry. Dram content should be passed through the 
 * request body. UserID should be passed through the request user. dramId should be passed through the request params.
 * 
 * @apiParam {Object} content Mandatory dram information
 * @apiParam {Number} userID Mandatory id of user
 * @apiParam {number} dramID Mandatory id of dram
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 201 OK
 * 
 */
router.put('/:id', rejectUnauthenticated, async (req, res) => {
    const dramID = req.params.id;
    try {
        const searchQuery = `SELECT * FROM "whiskey" WHERE ("whiskey_name" = $1 AND "whiskey_proof" = $2);`;
        const searchResult = await pool.query(searchQuery, [req.body.whiskey_name, req.body.whiskey_proof]);
        const whiskeyExists = (searchResult.rows.length == 1 ? true : false);
        switch (whiskeyExists) {
            case false:
                const insertWhiskeyQuery = `INSERT INTO "whiskey" ("whiskey_name", "whiskey_proof") VALUES ($1, $2) RETURNING "id";`;
                const postResult = await pool.query(insertWhiskeyQuery, [req.body.whiskey_name, req.body.whiskey_proof]);
                const whiskeyID1 = postResult.rows[0].id;
                const putDramQuery1 = `UPDATE "dram" SET "whiskey_id" = $1, "dram_quantity" = $2, "dram_calories" = $3 WHERE "id" = $4;`;
                const putResult1 = await pool.query(putDramQuery1, [whiskeyID1, req.body.dram_quantity, req.body.dram_calories, dramID]);
                break;
            case true:
                const whiskeyID2 = searchResult.rows[0].id;  
                const putDramQuery2 = `UPDATE "dram" SET "whiskey_id" = $1, "dram_quantity" = $2, "dram_calories" = $3 WHERE "id" = $4;`;
                const putResult2 = await pool.query(putDramQuery2, [whiskeyID2, req.body.dram_quantity, req.body.dram_calories, dramID]);
                break;
        }
        res.sendStatus(201);
    } catch (error) {
        console.log('Error in PUT', error);
        res.sendStatus(500);
    }
})

//GET drams from date range
/**
 * @api {get} /range/:rangeString Dram Data List
 * @apiPermission user
 * @apiName GetDataByDate
 * @apiGroup Dram
 * @apiDescription This route returns an array of dram data objects. The date string should be passed 
 * through the request params and the user should be passed through the request user.
 * 
 * @apiParam {String} rangeString Mandatory date range of dram data objects to fetch. YYYY-MM-DD_YYYY-MM-DD format.
 * @apiParam {Number} userID Mandatory id of user
 * 
 * @apiSuccess {Object} dataObject object with data property. object.data is an array of dram data objects.
 * 
 */
router.get('/range/:rangeString', rejectUnauthenticated, async (req, res) => {
    console.log(req.params.rangeString);
    const dateArray = req.params.rangeString.split('_');
    /* const rangeFloor = new Date(+dateArray[0]);
    rangeFloor.setUTCHours(0, 0, 0, 0);
    const rangeCeiling = new Date(+dateArray[1]);    
    rangeCeiling.setUTCHours(0, 0, 0, 0); */
    const rangeFloor = dateArray[0];
    const rangeCeiling = dateArray[1];
    console.log(new Date(+rangeFloor), new Date(+rangeCeiling));
    const userID = req.user.id;
    const queryText = `
        SELECT "dram"."dram_epoch", "dram"."dram_quantity", "dram"."dram_calories"
        FROM "dram"
        WHERE ("dram"."dram_epoch" BETWEEN $1 AND $2) AND "dram"."user_id" = $3
        ORDER BY "dram"."dram_epoch" ASC;`;
    pool.query(queryText, [rangeFloor.valueOf(), rangeCeiling.valueOf(), userID])
        .then((result) => {
            const resultObj = rearrangeArray(result.rows);//calls function that groups results array by date & sums calorie and quantity information. Output is an object.
            res.send(resultObj);
        })
        .catch((error) => {
            console.log('Error GETting data from date range', error);
            res.sendStatus(500);
        });
})

/* //PUT - edit dram with dramID using info from payload
router.put('/:id', rejectUnauthenticated, async (req, res) => {
    const dramID = req.params.id;
    //Phase 1: Check "whiskey" for entries matching the user's inputted information
    const searchQuery = `SELECT * FROM "whiskey" WHERE ("whiskey_name" = $1 AND "whiskey_proof" = $2);`;
    pool.query(searchQuery, [req.body.whiskey_name, req.body.whiskey_proof])
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
                    pool.query(insertWhiskeyQuery, [req.body.whiskey_name, req.body.whiskey_proof])
                        .then((result) => {
                            console.log(result.rows[0].id);
                            const whiskeyID = result.rows[0].id;
                            console.log(whiskeyID, 'yeeeeaaaaaa');
                            //Here's where whiskeyID is used to PUT dram info
                            const putDramQuery = `
                                UPDATE "dram" SET "whiskey_id" = $1, "dram_quantity" = $2, "dram_calories" = $3
                                WHERE "id" = $4;`;
                            pool.query(putDramQuery, [whiskeyID, req.body.dram_quantity, req.body.dram_calories, dramID])
                                .then((result) => {
                                    res.sendStatus(201);
                                })
                                .catch((error) => {
                                    console.log('Error editing dram', error);
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
                    console.log(whiskeyID, 'yeeeeaaaaaa');
                    //Here's where whiskeyID is used to PUT dram info
                    const putDramQuery = `
                        UPDATE "dram" SET "whiskey_id" = $1, "dram_quantity" = $2, "dram_calories" = $3
                        WHERE "id" = $4;`;
                    pool.query(putDramQuery, [whiskeyID, req.body.dram_quantity, req.body.dram_calories, dramID])
                        .then((result) => {
                            res.sendStatus(201);
                        })
                        .catch((error) => {
                            console.log('Error editing dram', error);
                            res.sendStatus(500);
                        });
                    break; 
            }
        }) 
        .catch((error) => {
            console.log('Error GETting whiskey info from DB', error);
        });    
}) */

/* //POST
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
}) */

module.exports = router;