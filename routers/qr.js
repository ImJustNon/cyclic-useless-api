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
const QRCode = require('qrcode');



router.get('/api/qr', urlencoded, async(req, res) =>{

    const { text } = req.query ?? {};

    if(typeof text === "undefined"){
        return res.json({
            status: "FAIL",
            error: 'Text query not found',
        });
    }

    await QRCode.toDataURL(text, async(err, url) =>{
        if(err){
            return res.json({
                status: `FAIL`, 
                error: `Cannt covert text to qr`,
            });
        }

        res.json({
            status: "SUCCESS",
            error: null,
            text: text,
            data: url,
        });
    });
});


module.exports = router;
