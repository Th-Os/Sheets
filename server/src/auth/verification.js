/**
 * @overview The verification process checks the token sent by the client and acts accordingly.
 * @author Thomas Oswald
 */

import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import log from '../utils/log';

/**
 * This function will check whether the req.params.id is a mongoDB ObjectId.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function verify(req, res, next) {
    // check if id is a valid mongoose ObjectId:
    if (req.params.id !== undefined) {
        if (!(req.params.id === '_search' || req.params.id === '_aggregate' || req.params.id === '_bulk')) {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                let err = new Error('Bad ObjectId.');
                res.status(400).send(err);
                log.error('VerificationError: ' + err + ' ' + err.message);
                return;
            }
        }
    }

    if (process.env.AUTH === 'false') {
        next();
        return;
    }
    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];
    if (!token) {
        log.error('VerificationError: ' + req.headers + ' - No token provided.');
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });
    }

    // verifies secret and checks exp
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) {
            log.error('VerificationError: ' + req.headers + ' - Failed to authenticate token.');
            return res.status(403).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        }

        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}
export default verify;