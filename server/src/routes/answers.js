import express from 'express';
import verify from '../auth/verify';
import {Answer, Solution} from '../models/submission';
import {Task} from '../models/sheet';
const router = express.Router();

router.get('/:id', verify, function(req, res, next) {
    let id = req.params.id;
    // TODO: solution is not populated
    Answer.findById(id).populate('task').populate({path: 'task.solution', model: 'Solution'}).then((doc) => {
        res.status(200).send(doc);
        next();
    }).catch((err) => {
        if (err) res.status(400).send(err);
    });
});

export default router;