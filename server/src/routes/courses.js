const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Get course');
});

router.post('/', function (req, res) {
    res.send('Post course');
});

router.put('/:id', function (req, res) {
    res.send('Put course');
});

router.delete('/:id', function (req, res) {
    res.send('Delete course');
});

router.get('/:id/students', function (req, res) {
    res.send('Get students of course');
});

router.get('/:id/sheets', function (req, res) {
    res.send('Get sheets of course');
});

router.post('/:id/sheets', function (req, res) {
    res.send('Post sheets to course');
});

module.exports = router;