var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('Get users');
});

router.post('/', function (req, res) {
    res.send('Post users');
});

router.get('/:id', function (req, res) {
    res.send('Get user');
});

router.get('/:id', function (req, res) {
    res.send('Get user');
});

router.put('/:id', function (req, res) {
    res.send('Put user');
});

router.delete('/:id', function (req, res) {
    res.send('Delete user');
});

module.exports = router;