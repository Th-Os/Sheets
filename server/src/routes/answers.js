var express = require('express');
var router = express.Router();

router.get('/:id', function (req, res) {
    res.send('Get answer');
});

module.exports = router;