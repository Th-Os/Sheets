import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import User from '../models/user';

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

router.post('/login', function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
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
router.get('/logout', function (req, res) {
    res.status(200).send({
        auth: false,
        token: null
    });
});

router.post('/register', function (req, res) {
    if (req !== undefined && req.body !== undefined && req.body.password !== undefined) {
        let hashedPassword = bcrypt.hashSync(req.body.password, 8);

        let newUser = User({
            username: req.body.username,
            password: hashedPassword
        });
        console.log(newUser);
        newUser.save(function (err) {
            console.log('saved');
            if (err) {
                console.log(err);
                return res.status(500).send('There was a problem registering the user.');
            }
            console.log();
        });
        /*
        User.create({
                username: req.body.username,
                password: hashedPassword
            },
            function (err, user) {
                console.log('begin');
                if (err) {
                    console.log(err);
                    return res.status(500).send('There was a problem registering the user.');
                }
                console.log(user);
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
            }).then(function (user) {
            console.log(user);
        });
        */
    } else {
        res.status(400).send();
    }
});

export default router;