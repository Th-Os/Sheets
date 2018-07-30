var express = require('express');
var router = express.Router();

router.put('/:id', function (req, res) {
    res.send('Put sheet');
});

router.delete('/:id', function (req, res) {
    res.send('Delete sheet');
});

router.get('/:id/exercises', function (req, res) {
    res.send('Get exercises');
});

router.post('/:id/exercises', function (req, res) {
    res.send('Post exercises');
});

router.post('/:id/submissions', function (req, res) {
    res.send('Post submissions');
});

router.get('/:id/submissions', function (req, res) {
    res.send('Get submissions');
});

router.delete('/:id/submissions', function (req, res) {
    res.send('Delete submissions');
});

router.get('/:id/export', function (req, res) {
    res.send('Export word / PDF');
});

router.get('/:id/csv', function (req, res) {
    res.send('Export csv');
});

router.get('/:id/template', function (req, res) {
    res.send('Export template');
});

module.exports = router;