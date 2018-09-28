import log4js from 'log4js';
import * as settings from '../../resources/settings';

log4js.configure({
    appenders: {
        all: { type: 'file', filename: settings.logging.name + '.log', maxLogSize: 10000000, backups: 5, keepFileExt: true, compress: true }
    },
    categories: {
        default: { appenders: [ 'all' ], level: '' + settings.logging.mode }
    }
});

function logRoute(req, res) {
    let log = log4js.getLogger();
    if (req.error === undefined) log.debug('API OK: ' + res.statusCode + ' at ' + req.method + ' ' + req.originalUrl);
    else log.error('API ERROR: ' + res.statusCode + ' at ' + req.method + ' ' + req.originalUrl + ' ERROR: ' + req.error.message);
}

export {logRoute};
export default log4js.getLogger();