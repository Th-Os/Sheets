// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Error

class RouteError extends Error {
    constructor(status, msg, ...params) {
        super(...params);
        this.name = 'RouteError';
        this.status = status;
        this.message = msg;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RouteError);
        }
    }
}

class StatusError extends Error {
    constructor(status, msg, ...params) {
        super(...params);
        this.name = 'StatusError';
        this.status = status;
        this.message = msg;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, StatusError);
        }
    }
}

export {RouteError, StatusError};