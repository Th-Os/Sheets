import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import {User, Role} from '../models/user';

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

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
            auth: true,
            token: token
        });
    });
});

// TODO: logout needs to take place in the client (deleting token)
router.get('/logout', function(req, res) {
    res.status(200).send({
        auth: false,
        token: null
    });
});

router.post('/register', function(req, res) {
    if (req !== undefined && req.body !== undefined && req.body.password !== undefined) {
        let hashedPassword = bcrypt.hashSync(req.body.password, 8);

        User.create({
            username: req.body.username,
            password: hashedPassword
        }).then(function(user) {
            Role.create({name: 'admin'}).then((role) => {
                user.role = role._id;

                // if user is registered without errors
                // create a token
                var token = jwt.sign({
                    id: user._id
                }, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                console.log(token);
                res.status(200).send({
                    auth: true,
                    token: token
                });
            });
        }).catch((err) => {
            if (err) return res.status(500).send('There was a problem registering the user.');
        });
    } else {
        res.status(404).send();
    }
});

export default router;