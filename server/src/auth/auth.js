/**
 * @module API/authentication
 */

/**
 * @overview The authentication handles login and logout requests.
 * @author Thomas Oswald
 */

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import {User} from '../models/user';
import {logRoute} from '../utils/log';

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

/**
 * Login route that generates a token for the client.
 * @name POST|auth/login
 * @function
 * @memberof module:API/authentication
 * @param req.body.username the username of the user.
 * @param req.body.password the password of the user.
 */
router.post('/login', function(req, res, next) {
    User.findOne({username: req.body.username}).exec().then((user) => {
        let err;
        if (!user) {
            err = new Error('AuthError: No user with name ' + req.body.username + ' found.');
            res.status(404).send(err);
            req.error = err;
            next();
        }

        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            err = new Error('AuthError: Password of user with username ' + req.body.username + ' is not valid.');
            res.status(401).send({
                user: user._id,
                auth: false,
                token: null
            });
            req.error = err;
            next();
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
        next();
    }).catch((err) => {
        err = new Error('AuthError: Error on the server.');
        res.status(500).send(err);
        req.error = err;
        next();
    });
}, logRoute);

/**
 * Logout route.
 * @name GET|auth/logout
 * @function
 * @memberof module:API/authentication
 */
router.get('/logout', function(req, res) {
    res.status(200).send({
        auth: false,
        token: null
    });
});

export default router;