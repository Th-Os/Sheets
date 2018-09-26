/**
 * @overview collection of custom error implementations.
 * @see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Error
 * @author Thomas Oswald
 */

/**
 * @class StatusError for failures in the routing process.
 */
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

/**
 * @class StatusError for failures in the routing process.
 */
class CorrectionError extends Error {
    constructor(correction, msg, ...params) {
        super(...params);
        this.name = 'CorrectionError';
        this.correction = correction;
        this.message = msg;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CorrectionError);
        }
    }
}

export {StatusError, CorrectionError};