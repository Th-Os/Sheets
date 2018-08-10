import express from 'express';
import verify from '../auth/verify';

const router = express.Router();

router.get('/', verify, function(req, res) {
    res.send('Get users');
});

router.post('/', verify, function(req, res) {
    res.send('Post users');
});

router.get('/:id', verify, function(req, res) {
    res.send('Get user');
});

router.get('/:id', verify, function(req, res) {
    res.send('Get user');
});

router.put('/:id', verify, function(req, res) {
    res.send('Put user');
});

router.delete('/:id', verify, function(req, res) {
    res.send('Delete user');
});

export default router;