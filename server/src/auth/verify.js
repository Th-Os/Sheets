import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

function verify(req, res, next) {
    // check if id is a valid mongoose ObjectId:
    if (req.params.id !== undefined) {
        if (!(req.params.id === '_search' || req.params.id === '_aggregate' || req.params.id === '_bulk')) {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                res.status(400).send('Bad ObjectId.');
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
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });
    }

    // verifies secret and checks exp
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) {
            return res.status(500).send({
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