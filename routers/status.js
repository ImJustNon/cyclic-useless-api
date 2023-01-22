const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
});

router.get('/', urlencoded, async(req, res) =>{
    return res.redirect("/api/status");
});

router.get('/api/status', urlencoded, async(req, res) =>{
    return res.json({
        status: "ONLINE",
        error: null,
    });
});


module.exports = router;