import express from 'express';
import verify from '../auth/verify';

const router = express.Router();

router.put('/:id', verify, function(req, res) {
    res.send('Put task');
});

router.delete('/:id', verify, function(req, res) {
    res.send('Delete task');
});

router.get('/:id/solutions', verify, function(req, res) {
    res.send('Get solutions of task');
});

router.post('/:id/solutions', verify, function(req, res) {
    res.send('Post solutions to task');
});

export default router;