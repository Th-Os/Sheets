import express from 'express';
import verify from '../auth/verify';

const router = express.Router();

router.put('/:id', verify, function(req, res) {
    res.send('Put sheet');
});

router.delete('/:id', verify, function(req, res) {
    res.send('Delete sheet');
});

router.get('/:id/exercises', verify, function(req, res) {
    res.send('Get exercises');
});

router.post('/:id/exercises', verify, function(req, res) {
    res.send('Post exercises');
});

router.post('/:id/submissions', verify, function(req, res) {
    res.send('Post submissions');
});

router.get('/:id/submissions', verify, function(req, res) {
    res.send('Get submissions');
});

router.delete('/:id/submissions', verify, function(req, res) {
    res.send('Delete submissions');
});

router.get('/:id/export', verify, function(req, res) {
    res.send('Export word / PDF');
});

router.get('/:id/csv', verify, function(req, res) {
    res.send('Export csv');
});

router.get('/:id/template', verify, function(req, res) {
    res.send('Export template');
});

export default router;