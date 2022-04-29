const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//GET whiskeys
/**
 * @api {get} /:id Dram List
 * @apiPermission user
 * @apiName GetDramsByDate
 * @apiGroup Dram
 * @apiDescription This route returns an array/list of dram objects with a particular dram_date. 
 * The date should be passed through the request params and the user should be passed through the request user.
 * 
 * @apiParam {String} dateID Mandatory date of dram objects to fetch. Millisecond epoch format.
 * @apiParam {Number} userID Mandatory id of user
 * 
 * @apiSuccess {Object} dataObject object with data property. object.data is an array of dram objects.
 * 
 */
 router.get('/:id', rejectUnauthenticated, async (req, res) => {
    const dateID = req.params.id;
    const dateFloor = parseInt(dateID);
    const dateCeiling = dateFloor + 86400000;
    const userID = req.user.id;
    console.log(dateID, dateFloor, dateCeiling);
    const queryText = `
        SELECT "dram"."id", "whiskey"."whiskey_name", "whiskey"."whiskey_proof", "whiskey_type", "dram"."dram_quantity", "dram"."dram_calories", "dram"."dram_epoch"
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