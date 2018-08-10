import express from 'express';
import verify from '../auth/verify';

const router = express.Router();
router.get('/', verify, function(req, res) {
    res.send('Get course');
});

router.post('/', verify, function(req, res) {
    res.send('Post course');
});

router.put('/:id', verify, function(req, res) {
    res.send('Put course');
});

router.delete('/:id', verify, function(req, res) {
    res.send('Delete course');
});

router.get('/:id/students', verify, function(req, res) {
    res.send('Get students of course');
});

router.get('/:id/sheets', verify, function(req, res) {
    res.send('Get sheets of course');
});

router.post('/:id/sheets', verify, function(req, res) {
    res.send('Post sheets to course');
});

export default router;