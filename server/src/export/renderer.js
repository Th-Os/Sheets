/**
 * @overview The renderer of docx and pdf files.
 * @author Thomas Oswald
 */

import report from 'jsreport-core';
import docx from 'jsreport-html-embedded-in-docx';

/**
 * @class Renderer defines jsreport specific template values and extensions.
 */
function Renderer() {
    this.obj = {
        template: {
            content: 'localhost:' + process.env.PORT + '/resources/pdf.html',
            engine: 'handlebars',
            recipe: '',
            helpers: ''
        },
        data: {},
        name: 'output'
    };
    this.renderer = report({
        'extensions': {
            'assets': {
                // wildcard pattern for accessible linked or external files
                allowedFiles: '**.css',
                // enables access to files not stored as linked assets in jsreport store
                searchOnDiskIfNotFoundInStore: false,
                // root url used when embedding assets as links {#asset foo.js @encoding=link}
                rootUrlForLinks: 'localhost:' + process.env.PORT + '/resources',
                // make all assets accessible to anonymous requests
                publicAccessEnabled: true
            }
        }
    });
}

Renderer.prototype.html = function(html) {
    this.obj.template.content = html;
    return this;
};

Renderer.prototype.data = function(data) {
    this.obj.data = data;
    return this;
};

Renderer.prototype.name = function(name) {
    this.obj.name = name;
    return this;
};

/**
 * Adds a helper function to use in the template html.
 * @param {Function} helper function with name.
 */
Renderer.prototype.addHelper = function(helper) {
    this.obj.template.helpers += String(helper);
    return this;
};

/**
 * This setter specifies the output type.
 * @param {string} type ('docx'|'pdf')
 */
Renderer.prototype.output = function(type) {
    switch (type) {
        case 'docx':
            this.obj.template.recipe = 'html';
            break;
        case 'pdf':
        default:
            this.obj.template.recipe = 'chrome-pdf';
            break;
    }
    this.obj.output = type;
    return this;
};

/**
 * Sends a pdf or docx depending on the type.
 * When docx is selected, jsreport will render the html output
 * @param {object} res express response object.
 */
Renderer.prototype.send = function(res) {
    this.renderer.init().then(() => {
        this.renderer.render({
            template: this.obj.template,
            data: this.obj.data
        }).then((response) => {
            if (this.obj.output === 'docx') {
                let jsreport = report();
                jsreport.use(docx());
                jsreport.init().then(() => {
                    jsreport.render({
                        template: {
                            content: response.content.toString('utf8'),
                            recipe: 'html-embedded-in-docx',
                            engine: 'none'
                        }
                    }).then((response) => {
                        res.writeHead(200, {'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Content-disposition': 'attachment; filename=' + this.obj.name + '.docx'});
                        res.end(response.content, 'binary');
                    });
                });
            } else if (this.obj.output === 'pdf') {
                res.writeHead(200, {'Content-Type': 'application/pdf'});
                res.end(response.content, 'binary');
            } else {
                res.status(500).send('No type specified');
            }
        }).catch((e) => {
            res.status(500).send(e);
        });
    }).catch((e) => {
        res.status(500).send(e);
    });
};

Renderer.prototype.helpers = {};

/**
 * This function is a helper function.
 * It calculates the points of an exercise.
 * @param {object} exercise {Exercise}.
 */
Renderer.prototype.helpers.calcPoints = function calcPoints(exercise) {
    let points = 0;
    for (let task of exercise.tasks) {
        points += task.points;
    }
    return points;
};

/**
 * This function is a helper function.
 * It adds the template exercise, if the flag is set.
 * @param {Sheet} sheet {Sheet}.
 */
Renderer.prototype.helpers.addTemplateExercise = function addTemplateExercise(sheet) {
    if (sheet.template.flag) {
        let html = 'Einhaltung der Abgabekriterien (';
        html += sheet.template.points + ' Punkte)';
        return html;
    } else return '';
};

/**
 * This function is a helper function.
 * It adds the right order of a sheet to the name of the submission file.
 * @param {number} sheetOrder order of a {Sheet}.
 */
Renderer.prototype.helpers.addNameSubmissionFile = function addNameSubmissionFile(sheetOrder) {
    if (sheetOrder < 10) return '0' + sheetOrder;
    else return sheetOrder;
};

export default Renderer;