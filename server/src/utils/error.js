// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Error

class RouteError extends Error {
    constructor(status, msg, res, ...params) {
        super(...params);
        this.status = status;
        this.message = msg;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RouteError);
        }

        res.status(this.status).send(this.message);
    }
}

class StatusError extends Error {
    constructor(status, msg, ...params) {
        super(...params);
        this.status = status;
        this.message = msg;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RouteError);
        }
    }
}

export {RouteError, StatusError};