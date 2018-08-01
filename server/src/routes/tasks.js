const express = require('express');
const router = express.Router();

router.put('/:id', function (req, res) {
    res.send('Put task');
});

router.delete('/:id', function (req, res) {
    res.send('Delete task');
});

router.get('/:id/solutions', function (req, res) {
    res.send('Get solutions of task');
});

router.post('/:id/solutions', function (req, res) {
    res.send('Post solutions to task');
});

module.exports = router;