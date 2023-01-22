const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
});
const fs = require('fs');
const { query } = require("../database/postgreSQL/connect.js");
const { generate } = require("../utils/generate_name.js");
const { get_ip } = require("../utils/get_ip.js");
const { validURL } = require("../utils/is_valid_url.js");
const config = require("../configs/config.js");
const base64Img = require('base64-img');
const path = require('path');

router.get('/api/short-url', urlencoded, async(req, res) =>{ // รับโพส ข้อมูลภาพที่อัป

    const { url } = req.query ?? {};

    // เช็ค ถ้าไม่มีการส่ง query url มา
    if(typeof url === "undefined") {
        return res.json({
            status: "FAIL",
            error: "Url query not found",
        });
    }

    // เช็คถ้า URL ไม่ถูกต้อง
    if(!validURL(url)){
        return res.json({
            status: "FAIL",
            error: "Url is not valid",
        });
    }

    // เช็ค ถ้าเกิดว่าเคยใช้ลิ้งนี้ไปเเล้ว
    const getData = await query({
        sql: `SELECT * FROM short_url WHERE original_url='${url}'`,
    });
    if(getData.result.rows.length !== 0){
        return res.json({
            status: "SUCCESS",
            error: null,
            unique_id: getData.result.rows[0].unique_id,
            url: `${config.app.domain_url}/short/${getData.result.rows[0].unique_id}`,
            original_url: url,
        });
    }


    // หากยังไม่เคยพบให้บันทึกใหม่
    const unique_id = await generate(7);
    await query({
        sql: `INSERT INTO short_url(unique_id, original_url) VALUES('${unique_id}','${url}')`,
    }).then(() =>{
        res.json({
            status: "SUCCESS",
            error: null,
            unique_id: unique_id,
            url: `${config.app.domain_url}/short/${unique_id}`,
            original_url: url,
        });
    });
});

router.get('/short/:unique_id', async(req, res) =>{

    const { unique_id } = req.params ?? {};
    
    const get_info = await query({
        sql: `SELECT * FROM short_url WHERE unique_id='${unique_id}'`,
    });

    let rows = await get_info.result.rows;
    if(rows.lenth === 0){
        return res.json({
            status: "FAIL",
            error: "Cant find original url from this id",
        });
    }

    res.redirect(await rows[0].original_url);
});


module.exports = router;
