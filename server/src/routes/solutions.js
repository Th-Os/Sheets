import express from 'express';
import verify from '../auth/verify';

const router = express.Router();

router.put('/:id', verify, function(req, res) {
    res.send('Put solutions');
});

router.delete('/:id', verify, function(req, res) {
    res.send('Delete solutions');
});

export default router;