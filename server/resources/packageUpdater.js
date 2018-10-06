/**
 * This packageUpdater is executed with "node ./resources/packageUpdater.js"
 * and updates the dependencies of the build package.json.
 */

var fs = require('fs');
var input = require('../package.json');
var output = require('./package.json');

output.dependencies = {};
output.dependencies = input.dependencies;

fs.writeFileSync('./resources/package.json', JSON.stringify(output, null, 4));