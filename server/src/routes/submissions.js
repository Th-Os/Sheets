const express = require('express');
const router = express.Router();

router.get('/:id/answers', function (req, res) {
    res.send('Get answers of submission');
});

module.exports = router;