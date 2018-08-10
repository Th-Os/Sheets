import express from 'express';
import verify from '../auth/verify';
const router = express.Router();

router.get('/:id', verify, function(req, res, next) {
    res.send('Get answer');
});

export default router;