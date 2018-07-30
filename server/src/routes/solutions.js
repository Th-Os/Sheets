var express = require('express');
var router = express.Router();

router.put('/:id', function (req, res) {
    res.send('Put solutions');
});

router.delete('/:id', function (req, res) {
    res.send('Delete solutions');
});

module.exports = router;