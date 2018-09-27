/**
 * @overview The authentication handles login and logout requests.
 * @author Thomas Oswald
 */

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import {User} from '../models/user';

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

/**
 * Login route that generates a token for the client.
 * @param req.body.username the username of the user.
 * @param req.body.password the password of the user.
 */
router.post('/login', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                user: user._id,
                auth: false,
                token: null
            });
        }

        // if user is found and password is valid
        // create a token
        var token = jwt.sign({
            id: user._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        res.status(200).send({
            user: user._id,
            auth: true,
            token: token
        });
    });
});

/**
 * Logout route.
 */
router.get('/logout', function(req, res) {
    res.status(200).send({
        auth: false,
        token: null
    });
});

export default router;