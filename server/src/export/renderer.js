import report from 'jsreport-core';
import docx from 'jsreport-html-embedded-in-docx';

function Renderer() {
    this.obj = {
        template: {
            content: 'localhost:' + process.env.PORT + '/resources/pdf.html',
            engine: 'handlebars',
            recipe: 'chrome-pdf',
            helpers: String(calcPoints)
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

function calcPoints(exercise) {
    let points = 0;
    for (let task of exercise.tasks) {
        points += task.points;
    }
    return points;
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

Renderer.prototype.addHelper = function(helper) {
    this.obj.template.helpers += String(helper);
    return this;
};

/**
 * This setter specifies the output type.
 * @param {string} type ('docx'||'pdf')
 */
Renderer.prototype.output = function(type) {
    this.obj.output = type;
    return this;
};

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
                        res.writeHead(200, {'Content-Type': 'application/vnd.openxmlformats-officedocument. wordprocessingml.document', 'Content-disposition': 'attachment; filename=' + this.obj.name + '.docx'});
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

export default Renderer;