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

function logRoute(req, res) {
    let log = log4js.getLogger();
    if (req.error === undefined) log.debug('API OK: ' + res.statusCode + ' at ' + req.method + ' ' + req.originalUrl);
    else log.error('API ERROR: ' + res.statusCode + ' at ' + req.method + ' ' + req.originalUrl + ' ERROR: ' + req.error.message);
}

export {logRoute};
export default log4js.getLogger();