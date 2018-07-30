var express = require('express');
var router = express.Router();

router.put('/:id', function (req, res) {
    res.send('Put exercise');
});

router.delete('/:id', function (req, res) {
    res.send('Delete exercise');
});

router.get('/:id/tasks', function (req, res) {
    res.send('Get tasks');
});

router.post('/:id/tasks', function (req, res) {
    res.send('Post tasks');
});

module.exports = router;