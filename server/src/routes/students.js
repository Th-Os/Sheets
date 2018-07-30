var express = require('express');
var router = express.Router();

router.get('/:id', function (req, res) {
    res.send('Get student');
});

router.post('/', function (req, res) {
    res.send('Post student');
});

router.put('/:id', function (req, res) {
    res.send('Put student');
});

router.delete('/:id', function (req, res) {
    res.send('Delete student');
});

router.get('/:id/submissions', function (req, res) {
    res.send('get student submissions');
});

router.get('/:id/courses', function (req, res) {
    res.send('get student courses');
});

module.exports = router;