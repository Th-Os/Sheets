import express from 'express';
import verify from '../auth/verify';

const router = express.Router();

router.get('/:id', verify, function(req, res) {
    res.send('Get student');
});

router.post('/', verify, function(req, res) {
    res.send('Post student');
});

router.put('/:id', verify, function(req, res) {
    res.send('Put student');
});

router.delete('/:id', verify, function(req, res) {
    res.send('Delete student');
});

router.get('/:id/submissions', verify, function(req, res) {
    res.send('get student submissions');
});

router.get('/:id/courses', verify, function(req, res) {
    res.send('get student courses');
});

export default router;