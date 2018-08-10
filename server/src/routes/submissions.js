import express from 'express';
import verify from '../auth/verify';

const router = express.Router();

router.get('/:id/answers', verify, function(req, res) {
    res.send('Get answers of submission');
});

export default router;