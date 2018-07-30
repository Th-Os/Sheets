var express = require('express');
var router = express.Router();

router.get('/:id/answers', function (req, res) {
    res.send('Get answers of submission');
});

module.exports = router;