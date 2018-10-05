/**
 * Logging
 * @module utils/logging
 */

/**
 * @overview logging mechanism with log4js.
 * @author Thomas Oswald
 */

import log4js from 'log4js';
import * as settings from '../../resources/settings';

const config = {
    appenders: {
        all: { type: 'file', filename: 'logs/' + settings.logging.name + '.log', maxLogSize: 10000000, backups: 5, keepFileExt: true, compress: true }
    },
    categories: {
        default: { appenders: [ 'all' ], level: '' + settings.logging.mode }
    }
};

if (settings.logging.console) {
    config.appenders.console = { type: 'console' };
    config.categories.default.appenders.push('console');
}

log4js.configure(config);

/**
 * Logging express routes. This is used for the API calls.
 * @param {*} req request object of express with an additional error key value pair.
 * @param {*} res response object of express.
 */
function logRoute(req, res) {
    let log = log4js.getLogger();
    if (req.error === undefined) log.debug('API OK: ' + res.statusCode + ' at ' + req.method + ' ' + req.originalUrl);
    else log.error('API ERROR: ' + res.statusCode + ' at ' + req.method + ' ' + req.originalUrl + ' ERROR: ' + req.error.message);
}

export {logRoute};
export default log4js.getLogger();