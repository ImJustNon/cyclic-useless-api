const express = require('express');
const router = express.Router();

router.get("/src", (req, res) =>{
    res.redirect("https://github.com/ImJustNon/cyclic-useless-api");
});

module.exports = router;