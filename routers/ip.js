const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
});
const fs = require('fs');
const { get_ip } = require("../utils/get_ip.js");


router.get('/api/ip', urlencoded, async(req, res) =>{

    const { format } = req.query ?? {};
    
    if(format === "json"){
        console.log(`[API] Request From IP : ${await get_ip(req)}`);
        return res.json({
            status: "SUCCESS",
            error: null,
            ip: await get_ip(req).replace(/::ffff:/g, ""),
        });
    }
    
    res.send(await get_ip(req).replace(/::ffff:/g, ""));
});

module.exports = router;