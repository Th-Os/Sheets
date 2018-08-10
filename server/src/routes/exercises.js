import express from 'express';
import verify from '../auth/verify';

const router = express.Router();

router.put('/:id', verify, function(req, res) {
    res.send('Put exercise');
});

router.delete('/:id', verify, function(req, res) {
    res.send('Delete exercise');
});

router.get('/:id/tasks', verify, function(req, res) {
    res.send('Get tasks');
});

router.post('/:id/tasks', verify, function(req, res) {
    res.send('Post tasks');
});

export default router;